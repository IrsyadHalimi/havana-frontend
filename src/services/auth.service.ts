// src/services/auth.service.ts
import { LoginInput, RegisterInput } from '../validators/auth.validator';
import { AuthResponse } from '../types/auth.type';

const API_URL = 'http://localhost:5000/api/auth'; // Sesuaikan port backend Anda

export const authService = {
  async login(data: LoginInput): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Gagal Login');
    return res.json();
  },

  async register(data: RegisterInput): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Gagal Registrasi');
    return res.json();
  },

  async verifyEmail(token: string, password?: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Verifikasi Gagal');
    return res.json();
  },

  async resendVerification(email: string): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Gagal kirim ulang token');
    return res.json();
  },
};