// src/hooks/useAuth.ts
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';
import { LoginInput, RegisterInput } from '../validators/auth.validator';

// Helper untuk mengekstrak pesan error dari Axios/Backend secara aman
const getErrorMessage = (err: any, fallbackMessage: string): string => {
  // Jika error berasal dari response backend yang dikirim via Axios
  if (err?.response?.data?.message) {
    return err.response.data.message;
  }
  // Jika error kustom instansiasi lokal atau error standar JS
  if (err instanceof Error) {
    return err.message;
  }
  // Fallback jika tidak terdeteksi
  return fallbackMessage;
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const store = useAuthStore();

  const login = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      store.setCurrentUser(response.user);
      
      if (response.user.role === 'tenant') {
        store.setAdminMode(true);
        store.setAuthScreen(null);
      } else if (!response.user.isVerified) {
        store.setAuthScreen('verify');
      } else {
        store.setAuthScreen(null);
      }
    } catch (err: any) {
      setError(getErrorMessage(err, 'Terjadi kesalahan saat login.'));
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(data);
      store.setAuthScreen('verify');
    } catch (err: any) {
      setError(getErrorMessage(err, 'Terjadi kesalahan saat registrasi.'));
    } finally {
      setLoading(false);
    }
  };

  const verify = async (token: string, password?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verifyEmail(token, password);
      store.setCurrentUser(response.user);
      store.setAuthScreen(null);
    } catch (err: any) {
      setError(getErrorMessage(err, 'Verifikasi gagal.'));
    } finally {
      setLoading(false);
    }
  };

  const resendToken = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await authService.resendVerification(email);
      alert('Kode verifikasi baru telah dikirimkan ke email Anda.');
    } catch (err: any) {
      setError(getErrorMessage(err, 'Gagal mengirim ulang kode verifikasi.'));
    } finally {
      setLoading(false);
    }
  };

  return { login, register, verify, resendToken, loading, error, setError };
};