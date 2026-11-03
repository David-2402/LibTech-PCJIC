import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "users";
const SESSION_KEY = "session";

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  );

  // Crea el usuario admin por defecto la primera vez que se abre la app
  useEffect(() => {
    const users = loadUsers();
    const adminExists = users.some((u) => u.user === "admin");
    if (!adminExists) {
      users.push({ user: "admin", pass: "1234", role: "admin", secret: "biblioteca" });
      saveUsers(users);
    }
  }, []);

  function login(userIn, passIn) {
    const users = loadUsers();
    const found = users.find(
      (u) => u.user.toLowerCase() === userIn.trim().toLowerCase() && u.pass === passIn
    );
    if (!found) return { ok: false, error: "Usuario o contraseña incorrectos." };

    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    setUser(found);
    return { ok: true };
  }

  function register({ user: name, pass, role, secret }) {
    const users = loadUsers();
    if (users.some((u) => u.user.toLowerCase() === name.trim().toLowerCase())) {
      return { ok: false, error: "Este nombre de usuario ya está ocupado." };
    }
    users.push({ user: name.trim(), pass, role, secret: secret.trim() });
    saveUsers(users);
    return { ok: true };
  }

  function verifyRecovery(userIn, secretIn) {
    const users = loadUsers();
    return (
      users.find(
        (u) =>
          u.user.toLowerCase() === userIn.trim().toLowerCase() &&
          u.secret.toLowerCase() === secretIn.trim().toLowerCase()
      ) || null
    );
  }

  function resetPassword(userName, newPass) {
    const users = loadUsers().map((u) =>
      u.user === userName ? { ...u, pass: newPass } : u
    );
    saveUsers(users);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  const value = { user, login, register, verifyRecovery, resetPassword, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
