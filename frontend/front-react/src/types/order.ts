// ── Línea de pedido ───────────────────────────────────────────────────────────
export interface OrderLine {
  id:         number
  product_id: number
  name:       string        // nombre del producto
  quantity:   number
  unit_price: number
}

// ── Usuario que hizo el pedido ────────────────────────────────────────────────
export interface OrderUser {
  id:    number
  name:  string
  email: string
}

// ── Pedido ────────────────────────────────────────────────────────────────────
export type OrderMode   = "pickup" | "delivery"
export type OrderStatus = "completado" | "cancelado" | "en_curso" | "pendiente"

export interface Order {
  id:         number
  mode:       OrderMode
  address:    string | null
  phone:      string
  notes:      string | null
  total:      number
  status?:    OrderStatus   // opcional: si tu API lo devuelve en el futuro
  user:       OrderUser
  products:   OrderLine[]
  created_at: string
}

// ── Respuesta paginada de la API (por si usas paginate() en Laravel) ──────────
export interface PaginatedOrders {
  data: Order[]
  meta: {
    current_page: number
    last_page:    number
    per_page:     number
    total:        number
  }
}