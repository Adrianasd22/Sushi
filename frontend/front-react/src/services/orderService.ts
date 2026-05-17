import { env } from "../config/env"
import type { ApiResponse, Order, OrderStatus } from "../types/order"

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

// ── GET /orders ───────────────────────────────────────────────────────────────
export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${env.API_URL}/orders`, {
    headers: authHeaders(),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = await handleResponse<any>(res)

  // Igual que getProducts: soporta array plano o envuelto en data
  return Array.isArray(json) ? json : (json.data ?? json.orders ?? [])
}

// ── GET /orders/:id ───────────────────────────────────────────────────────────
export async function getOrderById(id: number): Promise<Order> {
  const res = await fetch(`${env.API_URL}/orders/${id}`, {
    headers: authHeaders(),
  })
  const json = await handleResponse<ApiResponse<Order>>(res)
  return json.data
}

// ── PATCH /orders/:id/status ──────────────────────────────────────────────────
export async function updateOrderStatus(
  id: number,
  status: OrderStatus,
): Promise<Order> {
  const res = await fetch(`${env.API_URL}/orders/${id}/status`, {
    method:  "PATCH",
    headers: authHeaders(),
    body:    JSON.stringify({ status }),
  })
  const json = await handleResponse<ApiResponse<Order>>(res)
  return json.data
}