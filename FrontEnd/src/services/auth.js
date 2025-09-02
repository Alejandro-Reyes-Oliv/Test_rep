const AUTH_STORAGE_KEY = "auth_session_v1";

// Servicio de autenticación simple (mock). Reemplazar por API real si existe.
const defaultUser = {
  username: "admin",
  name: "Administrador",
};

function saveSession(session) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

function loadSession() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function getCurrentUser() {
  const sess = loadSession();
  return sess?.user || null;
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export async function login({ username, password }) {
  // Simulación de demora
  await new Promise((r) => setTimeout(r, 300));

  const u = String(username || "").trim();
  const p = String(password || "");

  if ((u === "admin" || u.toLowerCase() === "administrador") && p === "admin123") {
    const session = { user: { ...defaultUser, username: "admin" }, ts: Date.now() };
    saveSession(session);
    return session.user;
  }

  throw new Error("Credenciales inválidas");
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

