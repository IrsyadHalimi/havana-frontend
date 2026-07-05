// src/routes/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const PublicRoute = () => {
  const { currentUser } = useAuthStore();

  // Jika user sudah login & verified, jangan bolehkan masuk ke halaman login/register lagi
  if (currentUser && currentUser.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};