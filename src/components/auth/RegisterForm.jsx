import { useState } from 'react';
import { registerUser, ROLES } from '../../services/userService';

export default function RegisterForm({ onDone, onBack }) {
  const [form, setForm] = useState({
    user: '',
    pass: '',
    role: ROLES[0].value,
    secret: '',
  });
  const [error, setError] = useState('');

  // Un solo manejador para todos los campos: usa el atributo "name" del input.
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerUser({
      user: form.user.trim(),
      pass: form.pass,
      role: form.role,
      secret: form.secret.trim(),
    });

    if (!result.ok) return setError(result.error);
    onDone('¡Cuenta registrada! Ya puedes iniciar sesión.');
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          value={form.user}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
          autoComplete="username"
          required
        />
        <input
          type="password"
          name="pass"
          value={form.pass}
          onChange={handleChange}
          placeholder="Contraseña"
          autoComplete="new-password"
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        <p className="hint">Palabra secreta para recuperación:</p>
        <input
          type="text"
          name="secret"
          value={form.secret}
          onChange={handleChange}
          placeholder="Ej: Mi perro"
          required
        />

        {error && <p className="form-message error">{error}</p>}
        <button type="submit" className="btn-gold">
          Registrarse
        </button>
      </form>

      <br />
      <button type="button" className="link-btn" onClick={onBack}>
        ⬅ Volver al inicio
      </button>
    </div>
  );
}
