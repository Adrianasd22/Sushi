export interface User {
  id: number
  name: string
  email: string
  role: "admin" | "trabajador"
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Ainhoa Quintero",
    email: "ainhoa@sushimiyu.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Carlos López",
    email: "carlos@sushimiyu.com",
    role: "trabajador",
  },
  {
    id: 3,
    name: "María Rodríguez",
    email: "maria@sushimiyu.com",
    role: "trabajador",
  },
]