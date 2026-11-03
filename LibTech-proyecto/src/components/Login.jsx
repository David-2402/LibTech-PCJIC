import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, register, verifyRecovery, resetPassword } = useAuth();
  const [view, setView] = useState("login"); // 'login' | 'register' | 'recover'

  // --- Login ---
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const result = login(loginUser, loginPass);
    if (!result.ok) setLoginError(result.error);
  }

  // --- Registro ---
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regRole, setRegRole] = useState("lector");
  const [regSecret, setRegSecret] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    const result = register({ user: regUser, pass: regPass, role: regRole, secret: regSecret });
    if (!result.ok) {
      alert(result.error);
      return;
    }
    alert("¡Cuenta registrada! Ya puedes iniciar sesión.");
    setRegUser("");
    setRegPass("");
    setRegSecret("");
    setRegRole("lector");
    setView("login");
  }

  // --- Recuperación ---
  const [recUser, setRecUser] = useState("");
  const [recSecret, setRecSecret] = useState("");
  const [recoveredUser, setRecoveredUser] = useState(null);
  const [recoverMsg, setRecoverMsg] = useState("");
  const [newPass, setNewPass] = useState("");

  function handleRecoverSubmit(e) {
    e.preventDefault();
    const found = verifyRecovery(recUser, recSecret);
    if (found) {
      setRecoveredUser(found.user);
      setRecoverMsg("");
    } else {
      setRecoverMsg("Los datos no coinciden con nuestros registros.");
    }
  }

  function handleSaveNewPass() {
    if (!newPass) return alert("Escribe una contraseña válida");
    resetPassword(recoveredUser, newPass);
    alert("Contraseña restablecida con éxito.");
    setRecoveredUser(null);
    setNewPass("");
    setRecUser("");
    setRecSecret("");
    setView("login");
  }

  function goTo(name) {
    return (e) => {
      e.preventDefault();
      setView(name);
    };
  }

  return (
    <div className="auth-page" style={{ minHeight: "100vh" }}>
      <div className="logo-superior">
        <img src="/img/libtech.png" alt="LibTech" />
      </div>

      <div className="auth-card">
        {view === "login" && (
          <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Usuario"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
              <button type="submit" className="btn-gold">Entrar</button>
            </form>
            {loginError && <p style={{ color: "crimson", marginTop: 10 }}>{loginError}</p>}
            <div className="auth-links">
              <a href="#" onClick={goTo("register")}>Crear cuenta</a>
              {" | "}
              <a href="#" onClick={goTo("recover")}>¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        )}

        {view === "register" && (
          <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nombre de Usuario"
                required
                value={regUser}
                onChange={(e) => setRegUser(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
              />
              <select value={regRole} onChange={(e) => setRegRole(e.target.value)}>
                <option value="lector">Lector (Solo lectura)</option>
                <option value="admin">Administrador (Descargas)</option>
              </select>
              <p className="hint">Palabra secreta para recuperación:</p>
              <input
                type="text"
                placeholder="Ej: Mi perro"
                required
                value={regSecret}
                onChange={(e) => setRegSecret(e.target.value)}
              />
              <button type="submit" className="btn-gold">Registrarse</button>
            </form>
            <br />
            <a href="#" className="back-link" onClick={goTo("login")}>⬅ Volver al inicio</a>
          </div>
        )}

        {view === "recover" && (
          <div>
            <h2>Recuperar Acceso</h2>
            <p style={{ textAlign: "center", fontSize: "0.9rem", marginBottom: 10 }}>
              Ingresa tu usuario y tu palabra secreta.
            </p>
            <form onSubmit={handleRecoverSubmit}>
              <input
                type="text"
                placeholder="Usuario"
                required
                value={recUser}
                onChange={(e) => setRecUser(e.target.value)}
              />
              <input
                type="text"
                placeholder="Palabra Secreta"
                required
                value={recSecret}
                onChange={(e) => setRecSecret(e.target.value)}
              />
              <button type="submit" className="btn-gold">Verificar</button>
            </form>
            {recoverMsg && <p style={{ color: "crimson", marginTop: 10 }}>{recoverMsg}</p>}

            {recoveredUser && (
              <div style={{ marginTop: 15 }}>
                <input
                  type="password"
                  placeholder="Nueva Contraseña"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <button type="button" className="btn-gold" onClick={handleSaveNewPass}>
                  Cambiar Contraseña
                </button>
              </div>
            )}
            <br />
            <a href="#" className="back-link" onClick={goTo("login")}>⬅ Volver al inicio</a>
          </div>
        )}
      </div>
    </div>
  );
}
