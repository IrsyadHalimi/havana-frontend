// src/types/auth.type.ts
export interface User {
  id?: string;
  email: string;
  fullName: string;
  role: 'tenant' | 'customer';
  isVerified: boolean;
}

export interface AuthResponse {
  user: User;
  token?: string; // Jika menggunakan JWT
  message?: string;
}