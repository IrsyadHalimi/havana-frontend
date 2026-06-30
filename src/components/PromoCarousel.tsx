import { useState } from 'react';
import { useAppStore } from '../store';

interface PromoSlide {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  lodgeId: string;
}

export default function PromoCarousel() {
  const { setSelectedLodgeId } = useAppStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: PromoSlide[] = [
    {
      id: 'tropical-collection',
      tag: 'SANCTUARI HAVANA',
      title: 'Koleksi Tropical',
      description: 'Benamkan diri Anda dalam kehijauan yang asri dan suara alam yang menenangkan di permata tersembunyi Havana di tengah hutan.',
      imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=700&q=80',
      lodgeId: 'bamboo-canopy'
    },
    {
      id: 'river-bamboo',
      tag: 'BERKELANJUTAN',
      title: 'Keheningan Aliran Air',
      description: 'Nikmati pondok bambu eksklusif di tepi sungai dengan pancuran batu vulkanik luar ruangan dan pemandangan Gunung Agung yang damai.',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80',
      lodgeId: 'hideout-bamboo'
    }
  ];

  const current = slides[activeSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-10" id="promo-carousel-container">
      
      {/* Golden Card Container */}
      <div className="bg-[#c2a370] rounded-3xl overflow-hidden shadow-lg border border-stone-200/20 grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-10 text-stone-950 items-center transition-all duration-500">
        
        {/* Left Side Copy */}
        <div className="md:col-span-7 space-y-5 flex flex-col items-start pr-0 md:pr-6">
          <span className="px-3.5 py-1.5 bg-stone-950/10 text-stone-900 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {current.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
            {current.title}
          </h2>
          <p className="text-stone-800 text-sm leading-relaxed max-w-md">
            {current.description}
          </p>
          <button
            onClick={() => setSelectedLodgeId(current.lodgeId)}
            className="px-6 py-3 bg-[#695333] hover:bg-[#524025] text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            id={`btn-discover-${current.id}`}
          >
            Temukan Sekarang
          </button>
        </div>

        {/* Right Side Framed Image */}
        <div className="md:col-span-5 h-[240px] md:h-[300px] w-full relative">
          <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-[#ebd9be] shadow-xl">
            <img
              src={current.imageUrl}
              alt={current.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
            />
          </div>
        </div>

      </div>

      {/* Pagination Slider Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              activeSlide === index 
                ? 'bg-brand-green w-6' 
                : 'bg-stone-300'
            }`}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
