import { SESSION_KEY, authMatrix } from "@/lib/auth/config";
import type { LoginPayload, Role, SessionUser } from "@/lib/auth/types";

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

export function loginWithMatrix(payload: LoginPayload) {
  const roleRecords = authMatrix[payload.role];
  const record = roleRecords?.[payload.username.trim().toLowerCase()];
  if (!record) return { ok: false as const, message: "Usuario inexistente para el rol seleccionado." };
  if (record.password !== payload.password) {
    return { ok: false as const, message: "Credenciales inválidas." };
  }
  saveSession(record.user);
  return { ok: true as const, user: record.user };
}
