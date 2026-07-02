import { create } from 'zustand';
import { SearchQuery, Booking, User } from './types';

interface AppState {
  activeTab: 'Beranda' | 'Destinasi' | 'Favorit' | 'Cerita Kami' | 'Pesanan';
  selectedLodgeId: string | null;
  searchQuery: SearchQuery;
  favorites: string[];
  bookings: Booking[];
  selectedCategory: string;
  sortBy: string;
  
  // Auth state
  currentUser: User | null;
  authScreen: 'login' | 'register' | 'verify' | null;
  
  // Admin Mode state
  isAdminMode: boolean;
  adminActiveTab: 'Resor' | 'Manajemen Kamar' | 'Analitik' | 'Pesanan' | 'Pengaturan';
  
  // Active detail page state helpers
  selectedRoomId: string | null;
  selectedStartDate: string;
  selectedEndDate: string;
  guestsCount: number;
  
  // Modals / Overlays
  isBookingListOpen: boolean;
  
  // Actions
  setActiveTab: (tab: 'Beranda' | 'Destinasi' | 'Favorit' | 'Cerita Kami' | 'Pesanan') => void;
  setSelectedLodgeId: (id: string | null) => void;
  setSearchQuery: (query: Partial<SearchQuery>) => void;
  toggleFavorite: (id: string) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
  setSelectedRoomId: (roomId: string | null) => void;
  setSelectedStayDates: (start: string, end: string) => void;
  setGuestsCount: (count: number) => void;
  setBookingListOpen: (isOpen: boolean) => void;
  
  // Auth actions
  setCurrentUser: (user: User | null) => void;
  setAuthScreen: (screen: 'login' | 'register' | 'verify' | null) => void;
  setAdminMode: (isAdmin: boolean) => void;
  setAdminActiveTab: (tab: 'Resor' | 'Manajemen Kamar' | 'Analitik' | 'Pesanan' | 'Pengaturan') => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'Beranda',
  selectedLodgeId: null,
  searchQuery: {
    location: '',
    startDate: '',
    endDate: '',
    guests: 2
  },
  favorites: [],
  bookings: [],
  selectedCategory: 'Semua',
  sortBy: 'default',
  
  // Auth default state
  currentUser: null,
  authScreen: null,
  
  // Admin Mode default
  isAdminMode: false,
  adminActiveTab: 'Analitik',
  
  // Interactive room selections default to first room
  selectedRoomId: null,
  selectedStartDate: '2026-11-01',
  selectedEndDate: '2026-11-04',
  guestsCount: 2,
  
  isBookingListOpen: false,

  setActiveTab: (tab) => set((state) => {
    if (tab === 'Pesanan') {
      return { activeTab: 'Beranda', isBookingListOpen: true };
    }
    return { activeTab: tab, selectedLodgeId: tab === 'Beranda' ? state.selectedLodgeId : null };
  }),
  
  setSelectedLodgeId: (id) => set({ 
    selectedLodgeId: id,
    selectedRoomId: null
  }),
  
  setSearchQuery: (query) => set((state) => ({ 
    searchQuery: { ...state.searchQuery, ...query } 
  })),
  
  toggleFavorite: (id) => set((state) => {
    const isFav = state.favorites.includes(id);
    return {
      favorites: isFav 
        ? state.favorites.filter((favId) => favId !== id)
        : [...state.favorites, id]
    };
  }),
  
  addBooking: (booking) => set((state) => ({
    bookings: [booking, ...state.bookings]
  })),
  
  cancelBooking: (id) => set((state) => ({
    bookings: state.bookings.filter((b) => b.id !== id)
  })),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sortBy) => set({ sortBy }),
  
  setSelectedRoomId: (roomId) => set({ selectedRoomId: roomId }),
  setSelectedStayDates: (start, end) => set({ selectedStartDate: start, selectedEndDate: end }),
  setGuestsCount: (count) => set({ guestsCount: count }),
  
  setBookingListOpen: (isOpen) => set({ isBookingListOpen: isOpen }),
  
  // Auth actions
  setCurrentUser: (user) => set({ currentUser: user }),
  setAuthScreen: (screen) => set({ authScreen: screen }),
  setAdminMode: (isAdmin) => set({ isAdminMode: isAdmin, activeTab: 'Beranda', selectedLodgeId: null }),
  setAdminActiveTab: (tab) => set({ adminActiveTab: tab })
}));
