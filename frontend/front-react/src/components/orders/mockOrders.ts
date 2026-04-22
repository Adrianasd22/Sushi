export type OrderType = "local" | "takeaway" | "delivery"

export interface OrderItem {
  id: number
  name: string
  done: boolean
}

export interface Order {
  id: number
  title: string // "Mesa 14" o "Juan Pérez"
  type: OrderType
  completed: boolean
  items: OrderItem[]
}

export const mockOrders: Order[] = [
  {
    id: 1,
    title: "Mesa 14",
    type: "local",
    completed: false,
    items: [
      { id: 1, name: "Ramen de pollo", done: false },
      { id: 2, name: "Nigiri de salmón", done: false },
    ],
  },
  {
    id: 2,
    title: "Juan Pérez",
    type: "takeaway",
    completed: false,
    items: [
      { id: 3, name: "Arroz frito", done: true },
      { id: 4, name: "Sopa miso", done: false },
      { id: 5, name: "Ramen vegano", done: true },
    ],
  },
  {
    id: 3,
    title: "Mesa 3",
    type: "local",
    completed: true,
    items: [
      { id: 5, name: "Ramen vegano", done: true },
    ],
  },
  {
    id: 4,
    title: "Mesa 9",
    type: "delivery",
    completed: false,
    items: [
      { id: 5, name: "Ramen vegano", done: true },
      { id: 5, name: "Ramen vegano", done: true },
      { id: 5, name: "Ramen vegano", done: true },
      { id: 5, name: "Ramen vegano", done: true },
      { id: 5, name: "Ramen vegano", done: true },
    ],
  },
]