import { useState, useMemo } from 'react';
import { Heart, MapPin, Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store';
import { lodgesData } from '../data';
import { Lodge } from '../types';

export default function LodgeGrid() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    sortBy, 
    setSortBy, 
    favorites, 
    toggleFavorite, 
    setSelectedLodgeId,
    searchQuery,
    activeTab
  } = useAppStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  const categories = ['Semua', 'Eco-Lodge', 'Rumah Pohon', 'Vila'];
  const itemsPerPage = 3;

  // Filter and sort logic
  const filteredLodges = useMemo(() => {
    let results = [...lodgesData];

    // 1. Tab-based filters
    if (activeTab === 'Favorit') {
      results = results.filter(lodge => favorites.includes(lodge.id));
    } else if (activeTab === 'Destinasi') {
      // Destinasi might show specific categories or just all
    }

    // 2. Category pill filter
    if (selectedCategory !== 'Semua') {
      results = results.filter(lodge => lodge.category === selectedCategory);
    }

    // 3. Search input location query
    if (searchQuery.location) {
      const q = searchQuery.location.toLowerCase();
      results = results.filter(lodge => 
        lodge.location.toLowerCase().includes(q) || 
        lodge.name.toLowerCase().includes(q)
      );
    }

    // 4. Sort logic
    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [selectedCategory, searchQuery.location, sortBy, activeTab, favorites]);

  // Paginated lists
  const paginatedLodges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLodges.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLodges, currentPage]);

  const totalPages = Math.ceil(filteredLodges.length / itemsPerPage) || 1;

  const getSortLabel = () => {
    switch(sortBy) {
      case 'price-asc': return 'Harga Terendah';
      case 'price-desc': return 'Harga Tertinggi';
      case 'rating': return 'Rating Tertinggi';
      default: return 'Esensi Havana';
    }
  };

  const handleLodgeSelect = (id: string) => {
    setSelectedLodgeId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (p: number) => {
    return `Rp.${p}.000`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 scroll-mt-24" id="lodge-explorer">
      
      {/* Search Result Info if searched */}
      {searchQuery.location && (
        <div className="mb-6 bg-brand-green/5 border border-brand-green/20 rounded-xl px-5 py-3 flex items-center justify-between text-xs text-brand-green font-medium">
          <span>Hasil pencarian untuk &ldquo;{searchQuery.location}&rdquo; ({filteredLodges.length} penginapan ditemukan)</span>
          <button 
            onClick={() => useAppStore.getState().setSearchQuery({ location: '' })}
            className="underline hover:text-brand-green-dark"
          >
            Bersihkan pencarian
          </button>
        </div>
      )}

      {/* Header filter controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-6 mb-8">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none" id="category-pills">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-full border cursor-pointer whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-brand-green text-white border-brand-green' 
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                }`}
              >
                {cat === 'Semua' ? 'Semua Kamar' : cat}
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="relative self-end sm:self-auto" id="sort-selector">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center justify-between gap-3 bg-white border border-stone-200 px-4 py-2.5 rounded-xl text-xs font-medium text-stone-700 hover:border-stone-300 focus:outline-none transition-all cursor-pointer"
          >
            <span>Urutkan: <strong className="font-semibold">{getSortLabel()}</strong></span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 top-[110%] bg-white border border-stone-100 shadow-xl rounded-xl py-1.5 w-44 z-30 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
              {[
                { value: 'default', label: 'Esensi Havana' },
                { value: 'price-asc', label: 'Harga Terendah' },
                { value: 'price-desc', label: 'Harga Tertinggi' },
                { value: 'rating', label: 'Rating Tertinggi' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setShowSortDropdown(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                    sortBy === opt.value
                      ? 'bg-brand-green/5 text-brand-green font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Lodges Grid list */}
      {paginatedLodges.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white border border-stone-200/50 rounded-2xl p-8 shadow-sm">
          <p className="text-stone-500 font-serif text-lg">Tidak ada akomodasi yang cocok dengan kriteria Anda.</p>
          <p className="text-xs text-stone-400">Silakan ubah kategori atau bersihkan kata kunci pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="lodges-grid">
          {paginatedLodges.map((lodge) => {
            const isFav = favorites.includes(lodge.id);
            return (
              <div 
                key={lodge.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/40 hover:border-brand-green/10 shadow-sm hover:shadow-xl group transition-all duration-300 flex flex-col h-full"
                id={`lodge-card-${lodge.id}`}
              >
                
                {/* Lodge Thumbnail Image */}
                <div className="relative h-64 md:h-56 overflow-hidden bg-stone-100">
                  <img
                    src={lodge.mainImage}
                    alt={lodge.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-brand-green text-white text-[9px] font-bold rounded-md tracking-wider">
                    {lodge.tag || lodge.category.toUpperCase()}
                  </span>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => toggleFavorite(lodge.id)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center text-stone-600 hover:text-red-500 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={isFav ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
                  >
                    <Heart className={`w-4.5 h-4.5 transition-all ${isFav ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} />
                  </button>
                </div>

                {/* Lodge details body */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Title and Rating */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        onClick={() => handleLodgeSelect(lodge.id)}
                        className="font-serif text-lg font-semibold text-stone-900 leading-snug hover:text-brand-green transition-colors cursor-pointer"
                      >
                        {lodge.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{lodge.rating}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{lodge.location}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stone-100 w-full pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase tracking-widest block font-bold">
                        Tarif
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-brand-green">
                          {formatPrice(lodge.basePrice)}
                        </span>
                        <span className="text-[10px] text-stone-400">/malam</span>
                      </div>
                    </div>

                    {/* Book Now trigger */}
                    <button
                      onClick={() => handleLodgeSelect(lodge.id)}
                      className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer"
                    >
                      Pesan
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12" id="lodges-pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 disabled:opacity-40 disabled:pointer-events-none hover:border-brand-green hover:text-brand-green transition-all cursor-pointer"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-brand-green text-white border-brand-green shadow-md'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 disabled:opacity-40 disabled:pointer-events-none hover:border-brand-green hover:text-brand-green transition-all cursor-pointer"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
