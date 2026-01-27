import type { LandingContent } from "@/lib/types";
import { getSessionUser } from "@/lib/auth/session";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

function getAuthHeaders(): Record<string, string> {
  const user = getSessionUser();
  if (user?.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}

// Convierte PascalCase a camelCase
function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// Convierte camelCase a PascalCase
function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Convierte recursivamente las keys de un objeto de PascalCase a camelCase
function keysToCamelCase<T>(obj: unknown): T {
  if (obj === null || obj === undefined) {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => keysToCamelCase(item)) as T;
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key in obj as Record<string, unknown>) {
      const camelKey = toCamelCase(key);
      result[camelKey] = keysToCamelCase((obj as Record<string, unknown>)[key]);
    }
    return result as T;
  }

  return obj as T;
}

// Convierte recursivamente las keys de un objeto de camelCase a PascalCase
function keysToPascalCase<T>(obj: unknown): T {
  if (obj === null || obj === undefined) {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => keysToPascalCase(item)) as T;
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key in obj as Record<string, unknown>) {
      const pascalKey = toPascalCase(key);
      result[pascalKey] = keysToPascalCase((obj as Record<string, unknown>)[key]);
    }
    return result as T;
  }

  return obj as T;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    console.error("API Error:", response.status, message);
    throw new Error(message || "No se pudo completar la solicitud.");
  }

  const data = await response.json();
  return keysToCamelCase<T>(data);
}

export const apiClient = {
  baseUrl: API_BASE_URL,
  getContent: () => fetchJson<LandingContent>("/api/content"),
  saveContent: (content: LandingContent) => {
    const payload = keysToPascalCase(content);
    console.log("Sending payload:", JSON.stringify(payload, null, 2));
    return fetchJson<LandingContent>("/api/content", {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  }
};
