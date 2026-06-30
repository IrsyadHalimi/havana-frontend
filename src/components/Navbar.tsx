import { Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useAppStore } from '../store';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    setSelectedLodgeId, 
    bookings, 
    favorites,
    setBookingListOpen,
    searchQuery,
    setSearchQuery
  } = useAppStore();

  const handleNavClick = (tab: 'Beranda' | 'Destinasi' | 'Favorit' | 'Cerita Kami' | 'Pesanan') => {
    if (tab === 'Beranda') {
      setSelectedLodgeId(null);
    }
    setActiveTab(tab);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#ebdcb9]/20 px-4 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('Beranda')} 
          className="cursor-pointer flex items-center gap-2 group"
          id="navbar-logo"
        >
          <span className="text-2xl font-serif font-bold text-brand-green tracking-wide group-hover:text-brand-green-dark transition-colors">
            Havana
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8" id="navbar-links">
          {(['Beranda', 'Destinasi', 'Favorit', 'Cerita Kami'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`nav-tab-${tab.toLowerCase().replace(' ', '-')}`}
                onClick={() => handleNavClick(tab)}
                className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                  isActive 
                    ? 'text-brand-green font-semibold' 
                    : 'text-gray-600 hover:text-brand-green'
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green rounded-full"></span>
                )}
                {tab === 'Favorit' && favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-3.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search, Bookings & User Action */}
        <div className="flex items-center gap-3 md:gap-4" id="navbar-actions">
          
          {/* Quick Search Input */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Cari ketenangan?"
              value={searchQuery.location}
              onChange={(e) => setSearchQuery({ location: e.target.value })}
              className="pl-9 pr-4 py-2 text-xs rounded-full border border-gray-200 bg-stone-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green w-48 lg:w-64 transition-all"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Bookings Drawer Toggle */}
          <button
            onClick={() => setBookingListOpen(true)}
            className="p-2 text-gray-600 hover:text-brand-green hover:bg-stone-100 rounded-full relative transition-all"
            title="Daftar Pesanan"
            id="btn-open-bookings"
          >
            <ShoppingBag className="w-5 h-5" />
            {bookings.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border-2 border-[#fbf9f6]">
                {bookings.length}
              </span>
            )}
          </button>

          {/* Profile Circle/Login Button */}
          <div 
            onClick={() => setBookingListOpen(true)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-95 transition-all"
            id="navbar-profile"
          >
            {bookings.length > 0 ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Profile Avatar" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-brand-green"
                />
                <span className="hidden lg:inline text-xs font-medium text-gray-700">Halim</span>
              </div>
            ) : (
              <button 
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-brand-green hover:bg-brand-green/5 rounded-full border border-brand-green/20 transition-all"
                id="btn-login"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
}
