import { z } from "zod";

export const verifySchema = z
  .object({
    password: z
      .string()
      .min(8, "Password minimal 8 karakter"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Konfirmasi password tidak sama",
    }
  );

export type VerifyFormData =
  z.infer<typeof verifySchema>;