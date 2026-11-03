// Lógica de usuarios (equivale al antiguo js/auth.js), sin nada de interfaz.
// Los usuarios se guardan en localStorage bajo la clave "users".
//
// ⚠ Es válido para un proyecto académico, pero las contraseñas quedan en texto
// plano en el navegador. En un sistema real esto debe hacerlo un servidor.

import { readJSON, writeJSON } from '../utils/storage';

const USERS_KEY = 'users';

const DEFAULT_ADMIN = {
  user: 'admin',
  pass: '1234',
  role: 'admin',
  secret: 'biblioteca',
};

// Roles disponibles al registrarse. Para agregar otro (por ejemplo "lector"),
// añade una línea aquí y aparecerá automáticamente en el formulario.
export const ROLES = [{ value: 'admin', label: 'Administrador' }];

export function roleLabel(role) {
  const found = ROLES.find((r) => r.value === role);
  return found ? found.label : role;
}

// Acepta "admin" y también "Administrador" (valor que usaba la versión anterior).
export function isAdminRole(role) {
  const r = String(role ?? '').toLowerCase();
  return r === 'admin' || r === 'administrador';
}

// Devuelve todos los usuarios y, si aún no existe, crea el admin por defecto.
export function getUsers() {
  const users = readJSON(USERS_KEY, []);
  if (!users.some((u) => u.user === DEFAULT_ADMIN.user)) {
    users.push(DEFAULT_ADMIN);
    writeJSON(USERS_KEY, users);
  }
  return users;
}

const sameText = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

export function findUser(username, password) {
  return (
    getUsers().find((u) => sameText(u.user, username) && u.pass === password) ?? null
  );
}

export function registerUser({ user, pass, role, secret }) {
  const users = getUsers();
  if (users.some((u) => sameText(u.user, user))) {
    return { ok: false, error: 'Este nombre de usuario ya está ocupado.' };
  }
  writeJSON(USERS_KEY, [...users, { user, pass, role, secret }]);
  return { ok: true };
}

// Paso 1 de recuperar contraseña: comprueba usuario + palabra secreta.
export function verifySecret(username, secret) {
  return (
    getUsers().find((u) => sameText(u.user, username) && sameText(u.secret, secret)) ??
    null
  );
}

// Paso 2: guarda la nueva contraseña.
export function resetPassword(username, newPass) {
  const users = getUsers().map((u) =>
    u.user === username ? { ...u, pass: newPass } : u
  );
  writeJSON(USERS_KEY, users);
}
