import { env } from "../config/env";
import type { LoginResponse } from "../types/auth";

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${env.API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // El backend devuelve un mensaje de error en el body
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? "Credenciales incorrectas.");
  }

  return res.json();
}