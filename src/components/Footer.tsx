import { Globe, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-[#ebdcb9]/30 pt-16 pb-8 px-6 md:px-12 mt-20" id="app-footer">
      <div className="max-w-7xl mx-auto">
        
        {/* Top footer area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-[#ebdcb9]/20">
          
          {/* Main info */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-serif font-bold text-brand-green tracking-wide">
                Havana
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
              Berdedikasi untuk melestarikan alam bersama Havana sambil menyediakan tempat suci yang tak tertandingi bagi jiwa manusia. Terhubung kembali dengan yang berarti.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all cursor-pointer">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Eksplorasi
              </h4>
              <ul className="space-y-2.5 text-sm text-stone-600">
                <li><a href="#destinasi" className="hover:text-brand-green transition-colors">Destinasi Havana</a></li>
                <li><a href="#panduan" className="hover:text-brand-green transition-colors">Panduan Eco</a></li>
                <li><a href="#keberlanjutan" className="hover:text-brand-green transition-colors">Keberlanjutan</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Perusahaan
              </h4>
              <ul className="space-y-2.5 text-sm text-stone-600">
                <li><a href="#filosofi" className="hover:text-brand-green transition-colors">Filosofi Havana</a></li>
                <li><a href="#kemitraan" className="hover:text-brand-green transition-colors">Kemitraan</a></li>
                <li><a href="#kontak" className="hover:text-brand-green transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm text-stone-600">
                <li><a href="#syarat" className="hover:text-brand-green transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#privasi" className="hover:text-brand-green transition-colors">Privasi</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom footer area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-stone-500">
          <div>
            © 2026 Havana. Hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Didesain untuk Alam</span>
            <span className="text-brand-gold">•</span>
            <span>Didukung oleh Ketenangan</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
