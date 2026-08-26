import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../api/mockApi";

const AuthContext = createContext(null);

const SESSION_KEY = "examhub_session_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const { user: savedUser, token: savedToken } = JSON.parse(raw);
        setUser(savedUser);
        setToken(savedToken);
      }
    } catch {
      // ignore corrupt session
    }
    setReady(true);
  }, []);

  async function login(email, password) {
    const { token: t, user: u } = await api.login(email, password);
    setUser(u);
    setToken(t);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: u, token: t }));
    return u;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(SESSION_KEY);
  }

  const value = { user, token, ready, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
