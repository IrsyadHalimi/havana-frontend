// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: ('user' | 'admin')[] }) => {
  const { currentUser, authScreen } = useAuthStore();

  // Jika belum login, tendang ke halaman auth/home
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  // Jika akun belum diverifikasi, paksa ke halaman verifikasi jika belum di sana
  if (!currentUser.isVerified) {
    return <Navigate to="/auth" replace />;
  }

  // Hak akses berdasarkan Role (User / Admin)
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};