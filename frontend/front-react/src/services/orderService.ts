import type { Order } from "../types/order"

// Cambia esta URL base por la de tu entorno si es diferente
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api"

// Recupera el token de autenticación guardado en localStorage
// (ajusta la clave si usas otro nombre)
function authHeaders(): HeadersInit {
  const token = localStorage.getItem("auth_token")
  return {
    "Content-Type":  "application/json",
    "Accept":        "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// ── GET /api/orders ───────────────────────────────────────────────────────────
// Devuelve todos los pedidos con usuario y productos cargados.
// En el controlador asegúrate de tener:
//   Order::with('user', 'products')->get()
export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/orders`, {
    headers: authHeaders(),
  })

  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar los pedidos`)
  }

  const json = await res.json()

  // Soporta tanto respuesta directa { data: [...] } como array plano [...]
  return Array.isArray(json) ? json : json.data
}

// ── GET /api/orders/:id ───────────────────────────────────────────────────────
export async function getOrder(id: number): Promise<Order> {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    headers: authHeaders(),
  })

  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar el pedido #${id}`)
  }

  const json = await res.json()
  return json.data ?? json
}