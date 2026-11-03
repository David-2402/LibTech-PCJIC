import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header>
      <div className="brand-top-left">
        <img src="/img/libtech.png" alt="LibTech" className="main-logo" />
        <span className="brand-name">LibTech</span>
      </div>
      <div className="header-tools">
        <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <span>{user.user} ({user.role})</span>
        <button className="btn-outline" onClick={logout}>Salir</button>
      </div>
    </header>
  );
}
