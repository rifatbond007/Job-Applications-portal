import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useAuth, type Role } from "../contexts/AuthContext";
import { LocalStorageKeys, getLocalStorageItem } from "../utils/localStorage";

function getDashboardPath(role: Role): string {
  if (role === "ADMIN") return "/admin";
  if (role === "RECRUITER") return "/job-poster";
  return "/job-seeker";
}

const ROLE_FOR_PATH: Record<string, Role> = {
  "/admin": "ADMIN",
  "/job-seeker": "CANDIDATE",
  "/job-poster": "RECRUITER",
};

export function ProtectedRoute({ allowedRole }: { allowedRole: Role }) {
  const { user, isReady } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const token = getLocalStorageItem<string | null>(LocalStorageKeys.TOKEN, null);

  useEffect(() => {
    if (!isReady) return;
    if (!token) {
      window.location.href = "/auth";
      return;
    }
    if (user && user.role !== allowedRole) {
      window.location.href = getDashboardPath(user.role);
    }
  }, [isReady, token, user, allowedRole]);

  if (!isReady || !token) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }
  if (user && user.role !== allowedRole) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Redirecting…</p>
      </div>
    );
  }

  return <Outlet />;
}

export function AuthRedirect() {
  const { user, isReady } = useAuth();
  const token = getLocalStorageItem<string | null>(LocalStorageKeys.TOKEN, null);

  useEffect(() => {
    if (!isReady) return;
    if (token && user) {
      window.location.href = getDashboardPath(user.role);
    }
  }, [isReady, token, user]);

  return null;
}
