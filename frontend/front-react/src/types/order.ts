// ── Wrapper genérico igual que en productService ──────────────────────────────
export type ApiResponse<T> = {
  data: T
}

// ── Línea de pedido ───────────────────────────────────────────────────────────
export interface OrderLine {
  id:         number
  product_id: number
  name:       string        // viene del OrderResource como 'name'
  quantity:   number
  unit_price: number
}

// ── Usuario que hizo el pedido ────────────────────────────────────────────────
export interface OrderUser {
  id:    number
  name:  string
  email: string
}

// ── Enums ─────────────────────────────────────────────────────────────────────
export type OrderMode   = "pickup" | "delivery"
export type OrderStatus = "pendiente" | "en_curso" | "completado" | "cancelado"

// ── Pedido ────────────────────────────────────────────────────────────────────
export interface Order {
  id:         number
  mode:       OrderMode
  address:    string | null
  phone:      string
  notes:      string | null
  total:      number
  status:     OrderStatus
  user:       OrderUser
  products:   OrderLine[]
  created_at: string
}