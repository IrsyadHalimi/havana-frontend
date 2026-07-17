import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama minimal 3 karakter"),
  email: z
    .email("Email tidak valid"),
  role: z.enum(["customer", "tenant"]),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export type RegisterFormData =
  z.infer<typeof registerSchema>;