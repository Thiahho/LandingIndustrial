import { SESSION_KEY } from "@/lib/auth/config";
import type { LoginPayload, LoginResponse, Role, SessionUser } from "@/lib/auth/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getSessionUser(): SessionUser | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch (error) {
    console.error("No se pudo leer la sesión", error);
    return null;
  }
}

export function saveSession(user: SessionUser) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function isAllowed(user: SessionUser | null, allowedRoles: Role[]) {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

export async function loginWithApi(payload: LoginPayload): Promise<{ ok: true; user: SessionUser } | { ok: false; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Credenciales inválidas." }));
      return { ok: false, message: error.message || "Credenciales inválidas." };
    }

    const data: LoginResponse = await response.json();
    const user: SessionUser = {
      id: data.id,
      username: data.username,
      displayName: data.displayName,
      role: data.role as Role,
      token: data.token
    };

    saveSession(user);
    return { ok: true, user };
  } catch (error) {
    console.error("Error en login:", error);
    return { ok: false, message: "Error de conexión con el servidor." };
  }
}
