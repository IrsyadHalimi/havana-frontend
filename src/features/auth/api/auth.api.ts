import axios from "axios";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  VerifyRequest,
  VerifyResponse,
} from "../types/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const authApi = {
  login(data:LoginRequest){
    return api.post<LoginResponse>(
      "/auth/login",
      data
    );
  },

  register(data:RegisterRequest){
    return api.post("/auth/register",data);
  },

  verifyEmail(data:VerifyRequest){
    return api.post<VerifyResponse>(
      "/auth/verify-email",
      data
    );
  }
}