import { useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

import { authApi } from "../api/auth.api";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

export default function RegisterForm() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "customer",
      password: ""
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setServerError("");
      setSuccessMessage("");

      await authApi.register(data);

      setSuccessMessage(
        "Registrasi berhasil. Silakan cek email Anda untuk melakukan verifikasi."
      );

      reset();
    } catch (error: any) {
      setServerError(
        error.response?.data?.message ??
          "Terjadi kesalahan saat registrasi."
      );
    }
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">
          Daftar
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Buat akun baru untuk mulai menggunakan aplikasi.
        </p>
      </div>

      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {serverError && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          {...register("fullName")}
          error={errors.fullName?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="nama@email.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Select
          label="Role"
          {...register("role")}
          error={errors.role?.message}
        >
          <option value="customer">
            Customer
          </option>

          <option value="tenant">
            Tenant
          </option>
        </Select>

        <Input
          type="password"
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          loading={isSubmitting}
          type="submit"
        >
          Daftar
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-semibold text-green-700 hover:underline"
        >
          Masuk
        </Link>
      </div>
    </>
  );
}