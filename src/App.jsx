import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import BookPage from './pages/BookPage';

// Mapa de páginas de la aplicación:
//   /login       → acceso (público)
//   /            → catálogo   (requiere sesión)
//   /libro/:id   → detalle    (requiere sesión)
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path="libro/:id" element={<BookPage />} />
        </Route>
      </Route>

      {/* Cualquier otra dirección vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
