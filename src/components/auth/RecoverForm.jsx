import { useState } from 'react';
import { verifySecret, resetPassword } from '../../services/userService';

// Recuperación en 2 pasos:
//   1) verificar usuario + palabra secreta
//   2) escribir la nueva contraseña
export default function RecoverForm({ onDone, onBack }) {
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [verifiedUser, setVerifiedUser] = useState(null); // null = paso 1
  const [newPass, setNewPass] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    const found = verifySecret(username, secret);
    if (!found) return setError('Los datos no coinciden con nuestros registros.');
    setError('');
    setVerifiedUser(found.user);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!newPass) return setError('Escribe una contraseña válida.');
    resetPassword(verifiedUser, newPass);
    onDone('Contraseña restablecida con éxito.');
  };

  return (
    <div>
      <h2>Recuperar Acceso</h2>

      {verifiedUser === null ? (
        <>
          <p className="recover-text">Ingresa tu usuario y tu palabra secreta.</p>
          <form onSubmit={handleVerify}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              required
            />
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Palabra Secreta"
              required
            />
            {error && <p className="form-message error">{error}</p>}
            <button type="submit" className="btn-gold">
              Verificar
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="recover-text">
            Datos verificados. Escribe la nueva contraseña para <b>{verifiedUser}</b>.
          </p>
          <form onSubmit={handleSave}>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Nueva Contraseña"
              autoComplete="new-password"
              required
            />
            {error && <p className="form-message error">{error}</p>}
            <button type="submit" className="btn-gold">
              Cambiar Contraseña
            </button>
          </form>
        </>
      )}

      <br />
      <button type="button" className="link-btn" onClick={onBack}>
        ⬅ Volver al inicio
      </button>
    </div>
  );
}
