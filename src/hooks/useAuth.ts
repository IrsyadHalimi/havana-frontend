// src/hooks/useAuth.ts
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';
import { LoginInput, RegisterInput } from '../validators/auth.validator';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const store = useAuthStore();

  const login = async (data: LoginInput) => {
    try {
      const response = await authService.login(data);
      store.setCurrentUser(response.user);
      
      if (response.user.role === 'admin') {
        store.setAdminMode(true);
        navigate('/admin'); // Pindah ke halaman admin
      } else if (!response.user.isVerified) {
        store.setAuthScreen('verify'); // Tetap di /auth tapi switch screen ke OTP
      } else {
        navigate('/dashboard'); // User biasa langsung ke dashboard
      }
    } catch (err: any) {      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(data);
      // Diasumsikan setelah register, user diarahkan ke verifikasi token
      store.setAuthScreen('verify');
    } catch (err: any) {
      setError(err.message);
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendToken = async (email: string) => {
    try {
      await authService.resendVerification(email);
      alert('Kode verifikasi baru telah dikirimkan ke email Anda.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { login, register, verify, resendToken, loading, error, setError };
};