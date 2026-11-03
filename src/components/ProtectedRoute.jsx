import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protección de ruta (antes: "if (!currentUser) window.location = 'login.html'").
// Si no hay sesión, redirige a /login; si la hay, muestra las rutas hijas.
export default function ProtectedRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
