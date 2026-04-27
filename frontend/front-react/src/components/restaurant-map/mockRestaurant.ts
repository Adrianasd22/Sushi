export type TableStatus = "free" | "reserved" | "occupied"

export interface TableMap {
  id: number
  x: number
  y: number
  seats: number
  status: TableStatus
}

export const tables: TableMap[] = [
  { id: 1, x: 120, y: 120, seats: 4, status: "free" },
  { id: 2, x: 240, y: 120, seats: 2, status: "occupied" },
  { id: 3, x: 360, y: 120, seats: 4, status: "reserved" },

  { id: 4, x: 120, y: 220, seats: 6, status: "free" },
  { id: 5, x: 260, y: 220, seats: 4, status: "free" },
  { id: 6, x: 420, y: 220, seats: 2, status: "occupied" },

  { id: 7, x: 120, y: 320, seats: 4, status: "free" },
]