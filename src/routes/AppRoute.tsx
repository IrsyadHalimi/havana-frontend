// src/routes/AppRoutes.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import AuthView from '../features/auth/views/AuthView';

// Dummy Pages untuk contoh (Ganti dengan page asli Anda nanti)
const Dashboard = () => <div className="p-8"><h1>User Dashboard (Protected)</h1></div>;
const AdminPanel = () => <div className="p-8"><h1>Admin Control Panel (Strictly Admin Only)</h1></div>;
const Unauthorized = () => <div className="p-8"><h1>403 - Anda tidak memiliki akses</h1></div>;

const router = createBrowserRouter([
  // 🔓 PUBLIC ROUTES (Halaman Auth)
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/auth',
        element: <AuthView />,
      },
    ],
  },

  // 🔒 PROTECTED ROUTES (Halaman Terproteksi Umum)
  {
    element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },

  // 🔐 ADMIN ONLY ROUTES (Halaman Khusus Admin)
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/admin',
        element: <AdminPanel />,
      },
    ],
  },

  // Rute Alternatif & 404
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '*', element: <Navigate to="/auth" replace /> },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};