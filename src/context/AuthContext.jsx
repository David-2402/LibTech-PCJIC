import { createContext, useContext, useState } from 'react';
import { readJSON, writeJSON, removeKey } from '../utils/storage';
import { findUser, isAdminRole } from '../services/userService';

// El contexto permite que cualquier componente sepa quién inició sesión
// sin pasar "props" de padre a hijo.
const AuthContext = createContext(null);
const SESSION_KEY = 'session';

export function AuthProvider({ children }) {
  // La sesión se recupera de localStorage al abrir la página (no se guarda la contraseña).
  const [user, setUser] = useState(() => readJSON(SESSION_KEY, null));

  const login = (username, password) => {
    const found = findUser(username, password);
    if (!found) return false;
    const session = { user: found.user, role: found.role };
    writeJSON(SESSION_KEY, session);
    setUser(session);
    return true;
  };

  const logout = () => {
    removeKey(SESSION_KEY);
    setUser(null);
  };

  const value = { user, isAdmin: isAdminRole(user?.role), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar el contexto:  const { user, login, logout } = useAuth();
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
