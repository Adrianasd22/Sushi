export interface OrderLine {
  id: number
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
}

export interface Order {
  id: number
  table_number: number
  status: "pendiente" | "en_curso" | "completado" | "cancelado"
  created_at: string
  lines: OrderLine[]
}