import { env } from "../config/env"
import type { User, UserFormData } from "../types/user"

type ApiResponse<T> = {
  data: T
}



function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.message ?? `Error ${res.status}`)
  }
  return res.json()
}

// ── GET /users ─────────────────────────────────────────────
export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${env.API_URL}/users`, {
    headers: authHeaders(),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = await handleResponse<any>(res)

  return Array.isArray(json) ? json : (json.data ?? json.users ?? [])
}

// ── GET /users/:id ─────────────────────────────────────────
export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`${env.API_URL}/users/${id}`, {
    headers: authHeaders(),
  })

  const data = await handleResponse<ApiResponse<User>>(res)
  return data.data
}

// ── POST /users ─────────────────────────────────────────────
export async function createUser(data: UserFormData): Promise<User> {
  const res = await fetch(`${env.API_URL}/users`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

  return handleResponse<User>(res)
}

// ── PUT /users/:id ─────────────────────────────────────────
export async function updateUser(
  id: number,
  data: UserFormData
): Promise<User> {
  const res = await fetch(`${env.API_URL}/users/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  })

  return handleResponse<User>(res)
}

// ── DELETE /users/:id ──────────────────────────────────────
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${env.API_URL}/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Error ${res.status}`)
  }
}