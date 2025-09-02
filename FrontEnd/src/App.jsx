import { useEffect, useState } from 'react'
import './App.css'
import AppointmentsPage from "./pages/CitasPage";
import LoginPage from "./pages/LoginPage.jsx";
import { getCurrentUser, login, logout } from "./services/auth.js";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    // Cargar sesión almacenada
    const u = getCurrentUser();
    setUser(u);
    setLoading(false);
  }, []);

  const handleLogin = async ({ username, password }) => {
    setLoggingIn(true);
    try {
      const u = await login({ username, password });
      setUser(u);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (loading) return <div className="p-4">Cargando…</div>;

  if (!user) {
    return (
      <LoginPage
        loading={loggingIn}
        onSubmit={handleLogin}
        onSuccess={() => { /* el estado user se actualiza en handleLogin */ }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-end p-3 border-b">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="p-4">
        <AppointmentsPage />
      </div>
    </div>
  );
}
export default App;
