import { env } from "../config/env";
type ApiResponse<T> = {
  data: T
}
import type {
  Product,
  ProductFilters,
  ProductFormData,
} from "../types/products";

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

// ── GET /products ──────────────────────────────────────────────
export async function getProducts(
  filters?: ProductFilters,
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters?.search) params.set("search", filters.search);
  if (filters?.category_id)
    params.set("category_id", String(filters.category_id));

  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${env.API_URL}/products${query}`, {
    headers: authHeaders(),
  });
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const json = await handleResponse<any>(res)

  // Adapta según lo que devuelva tu backend:
  return Array.isArray(json) ? json : (json.data ?? json.products ?? [])
}

// ── GET /products/:id ──────────────────────────────────────────
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${env.API_URL}/products/${id}`, {
    headers: authHeaders(),
  });
  const data = await handleResponse<ApiResponse<Product>>(res);
  return data.data;
}

// ── POST /products ─────────────────────────────────────────────
export async function createProduct(data: ProductFormData): Promise<Product> {
  const res = await fetch(`${env.API_URL}/products`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<Product>(res);
}

// ── PUT /products/:id ──────────────────────────────────────────
export async function updateProduct(
  id: number,
  data: ProductFormData,
): Promise<Product> {
  const res = await fetch(`${env.API_URL}/products/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<Product>(res);
}

// ── DELETE /products/:id ───────────────────────────────────────
export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${env.API_URL}/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse<void>(res);
}
