export type UserRole = "customer" | "tenant";

export interface RegisterRequest {
  fullName: string;
  email: string;
  role: UserRole;
}

export interface VerifyRequest {
  token: string;
  password: string;
}

export interface VerifyResponse {
  message: string;
}

export interface LoginRequest{
  email:string;
  password:string;
}

export interface User{
  id:string;
  fullName:string;
  email:string;
  role:"customer"|"tenant";
}

export interface LoginResponse{
  accessToken:string;
  refreshToken:string;
  user:User;
}