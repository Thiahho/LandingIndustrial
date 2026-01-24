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
    throw new Error(message || "No se pudo completar la solicitud.");
  }

  return (await response.json()) as T;
}

export const apiClient = {
  baseUrl: API_BASE_URL,
  getContent: () => fetchJson<LandingContent>("/api/content"),
  saveContent: (content: LandingContent) =>
    fetchJson<LandingContent>("/api/content", {
      method: "PUT",
      body: JSON.stringify(content)
    })
};
