import { env } from "../config/env";
import type { Category } from "../types/category";

type ApiResponse<T> = {
  data: T;
};

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? `Error ${res.status}`);
  }
  return res.json();
}

type CategoryFormData = {
  name: string;
};

// ── GET /categories ─────────────────────────────────────────────
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${env.API_URL}/categories`, {
    headers: authHeaders(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = await handleResponse<any>(res);

  return Array.isArray(json) ? json : (json.data ?? json.categories ?? []);
}

// ── GET /categories/:id ─────────────────────────────────────────
export async function getCategoryById(id: number): Promise<Category> {
  const res = await fetch(`${env.API_URL}/categories/${id}`, {
    headers: authHeaders(),
  });

  const data = await handleResponse<ApiResponse<Category>>(res);
  return data.data;
}

// ── POST /categories ────────────────────────────────────────────
export async function createCategory(
  data: CategoryFormData,
): Promise<Category> {
  const res = await fetch(`${env.API_URL}/categories`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse<Category>(res);
}

// ── PUT /categories/:id ─────────────────────────────────────────
export async function updateCategory(
  id: number,
  data: CategoryFormData,
): Promise<Category> {
  const res = await fetch(`${env.API_URL}/categories/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse<Category>(res);
}

// ── DELETE /categories/:id ──────────────────────────────────────
export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${env.API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error ${res.status}`);
  }

  // 👇 IMPORTANTE: NO intentes parsear JSON en DELETE
  return;
}
