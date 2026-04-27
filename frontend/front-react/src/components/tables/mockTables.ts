export type TableStatus = "free" | "occupied" | "paid"

export interface TableOrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Table {
  id: number
  status: TableStatus
  orders: TableOrderItem[]
}

export const mockTables: Table[] = [
  {
    id: 1,
    status: "free",
    orders: [],
  },
  {
    id: 2,
    status: "occupied",
    orders: [
      { id: 1, name: "Ramen", price: 16.5, quantity: 2 },
      { id: 2, name: "Nigiri salmón", price: 5.9, quantity: 4 },
    ],
  },
  {
    id: 3,
    status: "paid",
    orders: [
      { id: 3, name: "Arroz frito", price: 12, quantity: 1 },
    ],
  },
  // hasta 10
]