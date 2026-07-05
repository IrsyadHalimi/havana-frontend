// src/types/auth.type.ts
export interface User {
  id?: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

export interface AuthResponse {
  user: User;
  token?: string; // Jika menggunakan JWT
  message?: string;
}