// src/validators/auth.validator.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  role: z.enum(["customer", "tenant"]),
});

export const verifyEmailSchema = z.object({
  token: z.string().length(6, 'Kode verifikasi harus 6 digit'),
  // Catatan: Di backend kamu verifyEmailService menerima token & password.
  // Jika verify hanya butuh token, sesuaikan bagian password ini.
  password: z.string().optional(), 
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;