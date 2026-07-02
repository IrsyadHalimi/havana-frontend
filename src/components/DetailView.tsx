import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Star, ShieldCheck, Heart, Grid, Sparkles, Check } from 'lucide-react';
import { useAppStore } from '../store';
import { lodgesData } from '../data';
import ImageModal from './ImageModal';

export default function DetailView() {
  const { 
    selectedLodgeId, 
    setSelectedLodgeId, 
    favorites, 
    toggleFavorite,
    selectedRoomId,
    setSelectedRoomId,
    selectedStartDate,
    selectedEndDate,
    setSelectedStayDates,
    guestsCount,
    setGuestsCount,
    addBooking,
    setBookingListOpen
  } = useAppStore();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Get current selected lodge
  const lodge = lodgesData.find(l => l.id === selectedLodgeId) || lodgesData[0];

  // If no room selected yet, default to the first room
  useEffect(() => {
    if (lodge && !selectedRoomId) {
      setSelectedRoomId(lodge.availableRooms[0]?.id || null);
    }
  }, [lodge, selectedRoomId, setSelectedRoomId]);

  const selectedRoom = lodge.availableRooms.find(r => r.id === selectedRoomId) || lodge.availableRooms[0];

  // Calendar parameters
  const currentMonthName = 'November 2026';
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const startOffsetDays = 4; // Start calendar grid spacing (offset)

  // Parse start/end dates for highlighting calendar
  // Default is Nov 4 to Nov 7 (3 nights)
  const [startDay, setStartDay] = useState(4);
  const [endDay, setEndDay] = useState(7);

  const handleDayClick = (day: number) => {
    // Basic range click handler
    if (startDay && !endDay) {
      if (day > startDay) {
        setEndDay(day);
        const startStr = `2026-11-${startDay.toString().padStart(2, '0')}`;
        const endStr = `2026-11-${day.toString().padStart(2, '0')}`;
        setSelectedStayDates(startStr, endStr);
      } else {
        setStartDay(day);
      }
    } else {
      setStartDay(day);
      setEndDay(0);
    }
  };

  const nightsCount = endDay && startDay ? endDay - startDay : 3;

  // Recalculate price
  const roomPricePerNight = selectedRoom ? selectedRoom.pricePerNight : 320;
  const subtotal = roomPricePerNight * nightsCount;
  const ecoTax = 20; // Rp. 20k flat tax
  const totalPrice = subtotal + ecoTax;

  const handlePlaceBooking = () => {
    if (!selectedRoom) return;

    const bookingId = `booking-${Date.now()}`;
    addBooking({
      id: bookingId,
      lodgeId: lodge.id,
      lodgeName: lodge.name,
      roomName: selectedRoom.name,
      startDate: `2026-11-${startDay.toString().padStart(2, '0')}`,
      endDate: `2026-11-${endDay.toString().padStart(2, '0')}`,
      nights: nightsCount,
      totalGuests: guestsCount,
      pricePerNight: roomPricePerNight,
      subtotal,
      ecoTax,
      totalPrice,
      createdAt: new Date().toISOString()
    });

    // Toggle alert success
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      setBookingListOpen(true);
    }, 2000);
  };

  const formatPrice = (p: number) => {
    return `Rp.${p}.000`;
  };

  const isFav = favorites.includes(lodge.id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-8 animate-in fade-in duration-300" id="lodge-detail-view">
      
      {/* Success booking confirmation toast/banner */}
      {showSuccessAlert && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#3a6851] text-white border border-[#ebdcb9]/40 rounded-xl px-6 py-4 shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">✓</div>
          <div className="text-xs">
            <p className="font-semibold">Sukses Melakukan Reservasi!</p>
            <p className="text-[10px] text-stone-200">Pesanan telah ditambahkan ke kantong belanja Anda.</p>
          </div>
        </div>
      )}

      {/* Back breadcrumb and Action panel */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setSelectedLodgeId(null)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 hover:border-brand-green/30 text-xs font-semibold rounded-xl text-stone-700 hover:text-brand-green transition-all cursor-pointer"
          id="btn-back-to-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={() => toggleFavorite(lodge.id)}
          className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-red-500 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
          title={isFav ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        >
          <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 leading-tight">
          {lodge.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-brand-green" />
            <span>{lodge.location}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{lodge.rating} • 142 Ulasan</span>
          </div>
        </div>
      </div>

      {/* Gallery Grid (1 big on left, 4 on right in 2x2 grid) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3" id="lodge-gallery-grid">
        
        {/* Big main photo */}
        <div className="md:col-span-7 h-[300px] md:h-[420px] rounded-2xl overflow-hidden bg-stone-100 shadow-sm relative group">
          <img
            src={lodge.images[0]}
            alt={`${lodge.name} - Cover`}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 cursor-pointer"
            onClick={() => setIsGalleryOpen(true)}
          />
        </div>

        {/* Small right side photos grid */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3">
          {lodge.images.slice(1, 5).map((img, idx) => {
            const isLast = idx === 3;
            return (
              <div 
                key={idx}
                className="h-[145px] md:h-[204px] rounded-2xl overflow-hidden bg-stone-100 shadow-sm relative group cursor-pointer"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img
                  src={img}
                  alt={`${lodge.name} - Gallery ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Last photo overlay "Lihat semua foto" */}
                {isLast && (
                  <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px] flex flex-col items-center justify-center text-white gap-2 transition-colors hover:bg-stone-950/70">
                    <Grid className="w-5 h-5 text-brand-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Lihat semua foto
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Main split content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column (Rooms and description) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Description Section */}
          <div className="space-y-4 bg-white border border-stone-200/50 p-6 md:p-8 rounded-3xl shadow-sm">
            <h3 className="font-serif text-2xl font-semibold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <span>Rasakan Jantung Hutan</span>
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
              {lodge.description}
            </p>
          </div>

          {/* Rooms selector block */}
          <div className="space-y-5" id="available-rooms-section">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Tempat Peristirahan Tersedia
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {lodge.availableRooms.map((room) => {
                const isSelected = selectedRoomId === room.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`bg-white border rounded-2xl overflow-hidden p-4 md:p-5 flex flex-col sm:flex-row gap-5 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-brand-green ring-1 ring-brand-green shadow-md bg-brand-green/5' 
                        : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
                    }`}
                    id={`room-card-${room.id}`}
                  >
                    
                    {/* Small room thumb */}
                    <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Room details */}
                    <div className="flex-grow flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-lg font-bold text-stone-900">{room.name}</h4>
                          {isSelected && (
                            <span className="bg-brand-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>
                        
                        {/* Features bullet points */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {room.features.map((feat) => (
                            <span key={feat} className="text-[10px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-medium">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-bold text-brand-green">{formatPrice(room.pricePerNight)}</span>
                          <span className="text-[10px] text-stone-400">/malam</span>
                        </div>
                        <button
                          type="button"
                          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                            isSelected
                              ? 'bg-brand-green text-white'
                              : 'bg-white border border-stone-200 text-stone-700 hover:border-brand-green hover:text-brand-green'
                          }`}
                        >
                          {isSelected ? 'Terpilih' : 'Pilih Kamar'}
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right column (Reservation Sidebar Widget) */}
        <div className="lg:col-span-4 sticky top-24 space-y-6" id="reservation-sidebar">
          
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-md space-y-6">
            
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-stone-900">Ketersediaan</h3>
              <p className="text-xs text-stone-400">Pilih tanggal untuk reservasi Anda</p>
            </div>

            {/* Simulated Interactive Calendar */}
            <div className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50">
              
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-semibold text-stone-800">{currentMonthName}</span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Bali</span>
              </div>

              {/* Day names headers */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-stone-400">
                <span>S</span>
                <span>S</span>
                <span>R</span>
                <span>K</span>
                <span>J</span>
                <span>S</span>
                <span>M</span>
              </div>

              {/* Day values grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* empty offsets */}
                {Array.from({ length: startOffsetDays }).map((_, idx) => (
                  <span key={`offset-${idx}`} className="w-8 h-8"></span>
                ))}

                {/* Day buttons */}
                {calendarDays.map((day) => {
                  const isCurrentSelection = startDay && endDay && day >= startDay && day <= endDay;
                  const isStart = day === startDay;
                  const isEnd = day === endDay;
                  
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        isStart || isEnd
                          ? 'bg-brand-green text-white shadow-md'
                          : isCurrentSelection
                            ? 'bg-brand-green/20 text-brand-green font-bold'
                            : 'hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Calculations and Breakdown */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Pilihan {nightsCount} malam</span>
                <span className="font-semibold text-stone-800">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Pajak Eko</span>
                <span className="font-semibold text-stone-800">
                  {formatPrice(ecoTax)}
                </span>
              </div>
              
              {/* Divider */}
              <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800">Total</span>
                <span className="text-base font-bold text-brand-green">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Place reservation button */}
            <button
              onClick={handlePlaceBooking}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold py-4 px-4 rounded-xl shadow-lg shadow-brand-green/15 active:scale-98 transition-all cursor-pointer text-center"
              id="btn-place-booking"
            >
              Reservasi
            </button>

          </div>

        </div>

      </div>

      {/* Gallery lightboxes */}
      <ImageModal
        images={lodge.images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        title={lodge.name}
      />

    </div>
  );
}
