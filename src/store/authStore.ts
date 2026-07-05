// src/store/authStore.ts
import { create } from 'zustand';
import { User } from '../types/auth.type';

type AuthScreen = 'login' | 'register' | 'verify' | null;

interface AuthState {
  authScreen: AuthScreen;
  currentUser: User | null;
  isAdminMode: boolean;
  setAuthScreen: (screen: AuthScreen) => void;
  setCurrentUser: (user: User | null) => void;
  setAdminMode: (mode: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authScreen: 'login', // Default screen terbuka
  currentUser: null,
  isAdminMode: false,
  setAuthScreen: (screen) => set({ authScreen: screen }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setAdminMode: (mode) => set({ isAdminMode: mode }),
  logout: () => set({ currentUser: null, isAdminMode: false, authScreen: 'login' }),
}));