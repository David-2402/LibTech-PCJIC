import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm({ notice, onShowRegister, onShowRecover }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    // Si el login es correcto, LoginPage detecta el usuario y redirige al catálogo.
    if (!ok) setError('Usuario o contraseña incorrectos.');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>

      {notice && <p className="form-message success">{notice}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          autoComplete="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoComplete="current-password"
          required
        />
        {error && <p className="form-message error">{error}</p>}
        <button type="submit" className="btn-gold">
          Entrar
        </button>
      </form>

      <div className="auth-links">
        <button type="button" className="link-btn" onClick={onShowRegister}>
          Crear cuenta
        </button>
        <span>|</span>
        <button type="button" className="link-btn" onClick={onShowRecover}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
}
