import { X, Calendar, Users, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store';

export default function BookingList() {
  const { 
    bookings, 
    isBookingListOpen, 
    setBookingListOpen, 
    cancelBooking 
  } = useAppStore();

  if (!isBookingListOpen) return null;

  const formatPrice = (p: number) => {
    return `Rp.${p}.000`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="bookings-panel">
      
      {/* Dark overlay backdrop */}
      <div 
        onClick={() => setBookingListOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      ></div>

      {/* Drawer content sliding from the right */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-brand-cream border-l border-[#ebdcb9]/30 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#ebdcb9]/20 flex items-center justify-between bg-white">
          <div className="space-y-0.5">
            <h3 className="font-serif text-xl font-bold text-brand-green">Daftar Pesanan Anda</h3>
            <p className="text-xs text-stone-500">Konfirmasi reservasi akomodasi Havana</p>
          </div>
          <button
            onClick={() => setBookingListOpen(false)}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-all cursor-pointer"
            title="Tutup Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {bookings.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 px-4">
              <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold text-stone-800">Belum Ada Pesanan</h4>
                <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                  Mulai petualangan Anda di Havana. Pilih penginapan eksklusif di halaman Beranda untuk melakukan reservasi.
                </p>
              </div>
              <button
                onClick={() => {
                  setBookingListOpen(false);
                  const gridElement = document.getElementById('lodge-explorer');
                  if (gridElement) {
                    gridElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mt-2 px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
              >
                Cari Penginapan Sekarang
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">
                      {booking.lodgeName}
                    </h4>
                    <span className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider block mt-0.5">
                      {booking.roomName}
                    </span>
                  </div>
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Batalkan Reservasi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 bg-stone-50/50 border border-stone-100 rounded-xl p-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider font-semibold block">Tanggal</span>
                    <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                      <span>{booking.startDate.split('-')[2]}/{booking.startDate.split('-')[1]}</span>
                      <ArrowRight className="w-3 h-3 text-stone-400" />
                      <span>{booking.endDate.split('-')[2]}/{booking.endDate.split('-')[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider font-semibold block">Detail Stay</span>
                    <span className="text-stone-700 font-medium">
                      {booking.nights} Malam • {booking.totalGuests} Tamu
                    </span>
                  </div>
                </div>

                {/* Price breakdown and footer */}
                <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">Biaya Kamar ({booking.nights} malam)</span>
                    <span className="font-medium text-stone-800">{formatPrice(booking.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">Pajak Ekologis (Eko)</span>
                    <span className="font-medium text-stone-800">{formatPrice(booking.ecoTax)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-stone-100">
                    <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-brand-green" /> Total Pembayaran
                    </span>
                    <span className="text-sm font-bold text-brand-green">
                      {formatPrice(booking.totalPrice)}
                    </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Sticky total footer inside panel if has bookings */}
        {bookings.length > 0 && (
          <div className="p-6 bg-white border-t border-[#ebdcb9]/20 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-stone-500">Total Keseluruhan</span>
              <span className="text-lg font-bold text-brand-green">
                {formatPrice(bookings.reduce((sum, b) => sum + b.totalPrice, 0))}
              </span>
            </div>
            <button
              onClick={() => {
                alert('Menuju ke gerbang pembayaran aman Havana. Terima kasih atas pemesanan Anda!');
                setBookingListOpen(false);
              }}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold py-4.5 px-4 rounded-xl shadow-lg shadow-brand-green/15 active:scale-98 transition-all cursor-pointer text-center"
            >
              Lanjutkan Pembayaran Aman
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
