import { useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import {
  loginSchema,
  type LoginFormData,
} from "../schemas/login.schema";

import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    login,
    loading,
    error,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    await login(
      data.email,
      data.password
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">
          Login
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Masuk ke akun Anda.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Email"
          type="email"
          placeholder="nama@email.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <div>
          <Input
            label="Password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Masukkan password"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            {showPassword
              ? "Sembunyikan Password"
              : "Lihat Password"}
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
        >
          Login
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="font-semibold text-green-700 hover:underline"
        >
          Daftar
        </Link>
      </div>
    </>
  );
}