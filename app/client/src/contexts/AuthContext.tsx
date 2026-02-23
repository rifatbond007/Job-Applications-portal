import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import api from "../api/axios";
import { LocalStorageKeys, getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from "../utils/localStorage";

export type Role = "CANDIDATE" | "RECRUITER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  location?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isReady: boolean;
}

interface AuthContextValue extends AuthState {
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getDashboardPath(role: Role): string {
  if (role === "ADMIN") return "/admin";
  if (role === "RECRUITER") return "/job-poster";
  return "/job-seeker";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isReady: false,
  });

  const refreshUser = useCallback(async () => {
    const token = getLocalStorageItem<string | null>(LocalStorageKeys.TOKEN, null);
    if (!token) {
      setState((s) => ({ ...s, user: null, token: null, isReady: true }));
      return;
    }
    try {
      const { data } = await api.get<AuthUser>("/users/me");
      setState((s) => ({ ...s, user: data, token, isReady: true }));
    } catch {
      removeLocalStorageItem(LocalStorageKeys.TOKEN);
      removeLocalStorageItem(LocalStorageKeys.USER);
      setState((s) => ({ ...s, user: null, token: null, isReady: true }));
    }
  }, []);

  useEffect(() => {
    const token = getLocalStorageItem<string | null>(LocalStorageKeys.TOKEN, null);
    const user = getLocalStorageItem<AuthUser | null>(LocalStorageKeys.USER, null);
    if (token && user) {
      setState((s) => ({ ...s, token, user, isReady: true }));
      return;
    }
    if (token) {
      refreshUser();
      return;
    }
    setState((s) => ({ ...s, isReady: true }));
  }, [refreshUser]);

  const login = useCallback((token: string, user: AuthUser) => {
    setLocalStorageItem(LocalStorageKeys.TOKEN, token);
    setLocalStorageItem(LocalStorageKeys.USER, user);
    setState((s) => ({ ...s, token, user }));
    window.location.href = getDashboardPath(user.role);
  }, []);

  const logout = useCallback(() => {
    removeLocalStorageItem(LocalStorageKeys.TOKEN);
    removeLocalStorageItem(LocalStorageKeys.USER);
    setState((s) => ({ ...s, token: null, user: null }));
    window.location.href = "/auth";
  }, []);

  const setUser = useCallback((user: AuthUser | null) => {
    setState((s) => ({ ...s, user }));
    if (user) setLocalStorageItem(LocalStorageKeys.USER, user);
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    setUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
