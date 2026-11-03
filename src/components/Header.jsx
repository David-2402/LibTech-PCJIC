import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { roleLabel } from '../services/userService';
import { assetUrl } from '../utils/assets';

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <Link to="/" className="brand-top-left">
        <img src={assetUrl('img/libtech.png')} alt="" className="main-logo" />
        <span className="brand-name">LibTech</span>
      </Link>

      <div className="header-tools">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <span>
          {user.user} ({roleLabel(user.role)})
        </span>

        {/* Al cerrar sesión, ProtectedRoute detecta que no hay usuario y redirige a /login */}
        <button type="button" className="btn-outline" onClick={logout}>
          Salir
        </button>
      </div>
    </header>
  );
}
