import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { assetUrl } from '../utils/assets';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import RecoverForm from '../components/auth/RecoverForm';

// Equivale a login.html: una sola tarjeta que alterna entre 3 vistas.
export default function LoginPage() {
  const { user } = useAuth();
  const [view, setView] = useState('login'); // 'login' | 'register' | 'recover'
  const [notice, setNotice] = useState('');

  // Si ya hay sesión, no tiene sentido mostrar el login.
  if (user) return <Navigate to="/" replace />;

  const goTo = (nextView, message = '') => {
    setView(nextView);
    setNotice(message);
  };

  return (
    <div className="auth-page">
      <div className="logo-superior">
        <img src={assetUrl('img/libtech.png')} alt="LibTech" />
      </div>

      <div className="auth-card">
        {view === 'login' && (
          <LoginForm
            notice={notice}
            onShowRegister={() => goTo('register')}
            onShowRecover={() => goTo('recover')}
          />
        )}
        {view === 'register' && (
          <RegisterForm onDone={(msg) => goTo('login', msg)} onBack={() => goTo('login')} />
        )}
        {view === 'recover' && (
          <RecoverForm onDone={(msg) => goTo('login', msg)} onBack={() => goTo('login')} />
        )}
      </div>
    </div>
  );
}
