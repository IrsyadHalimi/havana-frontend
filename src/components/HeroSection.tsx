import { useState } from 'react';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store';

export default function HeroSection() {
  const { searchQuery, setSearchQuery, setSelectedCategory } = useAppStore();
  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [guests, setGuests] = useState(searchQuery.guests);

  const locations = [
    'Ubud, Bali',
    'Karangasem, Bali',
    'Payangan, Bali',
    'Semua Lokasi'
  ];

  const handleSearch = () => {
    // Scroll down to the lodge grid with smooth transition
    const gridElement = document.getElementById('lodge-explorer');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const adjustGuests = (amount: number) => {
    const newCount = Math.max(1, Math.min(10, guests + amount));
    setGuests(newCount);
    setSearchQuery({ guests: newCount });
  };

  return (
    <div className="relative w-full min-h-[580px] lg:min-h-[660px] flex flex-col justify-end pb-24 md:pb-28 pt-12" id="hero-section">
      
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80"
          alt="Havana Jungle Resort background"
          className="w-full h-full object-cover"
        />
        {/* Dark to light natural overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-800/20 to-brand-cream/90"></div>
      </div>

      {/* Main Hero Copy */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 mb-10 text-white">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight tracking-tight">
            Terhubung kembali dengan jantung alam bersama Havana.
          </h1>
          <p className="text-sm md:text-base text-stone-100/90 font-light leading-relaxed max-w-lg">
            Penginapan ramah lingkungan pilihan untuk pengalaman menginap restoratif dan kemewahan organik di destinasi Havana.
          </p>
        </div>
      </div>

      {/* Floating Search Form Widget */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-12" id="search-widget-container">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/50 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Lokasi Input */}
          <div className="lg:col-span-4 space-y-1.5 relative">
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
              Lokasi
            </label>
            <div 
              onClick={() => setShowLocationSelect(!showLocationSelect)}
              className="flex items-center justify-between gap-2 border border-stone-200 hover:border-brand-green/50 rounded-xl px-4 py-3.5 cursor-pointer bg-stone-50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-brand-green" />
                <span className="text-sm font-medium text-stone-800">
                  {searchQuery.location || 'Semua Lokasi (Bali)'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </div>

            {/* Simulated Location select dropdown */}
            {showLocationSelect && (
              <div className="absolute top-[105%] left-0 right-0 bg-white border border-stone-100 shadow-xl rounded-xl p-2 z-20 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => {
                      setSearchQuery({ location: loc === 'Semua Lokasi' ? '' : loc });
                      setShowLocationSelect(false);
                    }}
                    className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-brand-green/5 hover:text-brand-green rounded-lg cursor-pointer transition-colors"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Periode Istirahat Input */}
          <div className="lg:col-span-4 space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
              Periode Istirahat
            </label>
            <div className="flex items-center gap-2 border border-stone-200 hover:border-brand-green/50 rounded-xl px-4 py-2.5 bg-stone-50 transition-all">
              <Calendar className="w-4.5 h-4.5 text-brand-green flex-shrink-0" />
              <div className="flex items-center gap-1.5 w-full">
                <input
                  type="date"
                  value={searchQuery.startDate || '2026-11-01'}
                  onChange={(e) => setSearchQuery({ startDate: e.target.value })}
                  className="bg-transparent text-xs font-medium text-stone-800 focus:outline-none w-full cursor-pointer"
                  title="Tanggal Check-In"
                />
                <span className="text-stone-300">-</span>
                <input
                  type="date"
                  value={searchQuery.endDate || '2026-11-04'}
                  onChange={(e) => setSearchQuery({ endDate: e.target.value })}
                  className="bg-transparent text-xs font-medium text-stone-800 focus:outline-none w-full cursor-pointer"
                  title="Tanggal Check-Out"
                />
              </div>
            </div>
          </div>

          {/* Tamu Input */}
          <div className="lg:col-span-2 space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
              Tamu
            </label>
            <div className="flex items-center justify-between gap-3 border border-stone-200 rounded-xl px-4 py-2.5 bg-stone-50">
              <div className="flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-brand-green" />
                <span className="text-xs font-semibold text-stone-800">{guests}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustGuests(-1)}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-sm text-stone-600 hover:bg-brand-green/5 hover:text-brand-green cursor-pointer transition-all"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => adjustGuests(1)}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-sm text-stone-600 hover:bg-brand-green/5 hover:text-brand-green cursor-pointer transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 pt-4 lg:pt-5">
            <button
              onClick={handleSearch}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold py-4 px-4 rounded-xl shadow-lg shadow-brand-green/20 hover:shadow-brand-green/30 active:scale-[0.98] transition-all cursor-pointer text-center"
              id="btn-search-lodges"
            >
              Cari Penginapan
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
