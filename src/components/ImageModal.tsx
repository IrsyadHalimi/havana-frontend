import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ImageModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ImageModal({ images, isOpen, onClose, title }: ImageModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Top Header Controls */}
      <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between text-white z-10">
        <div>
          <h4 className="text-sm font-serif font-semibold tracking-wide">{title}</h4>
          <span className="text-xs text-stone-400 font-medium">Galeri Foto ({activeIndex + 1}/{images.length})</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer"
          title="Tutup Galeri"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Slider Viewport */}
      <div className="relative max-w-5xl w-full h-[70vh] px-4 flex items-center justify-center">
        
        {/* Left Control Arrow */}
        <button
          onClick={() => setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
          className="absolute left-6 md:left-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 border border-white/15"
          title="Foto Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Display Current Image */}
        <img
          src={images[activeIndex]}
          alt={`${title} - Gallery ${activeIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
        />

        {/* Right Control Arrow */}
        <button
          onClick={() => setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
          className="absolute right-6 md:right-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10 border border-white/15"
          title="Foto Selanjutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>

      {/* Bottom thumbnails scrollbar */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-6 overflow-x-auto pb-2 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
              activeIndex === idx ? 'border-brand-gold scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

    </div>
  );
}
