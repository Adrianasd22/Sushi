export type User = {
  id: number
  name: string
  email: string
  role: "user" | "admin" | "worker" 
}

export type UserFormData = {
  name: string
  email: string
  password?: string
  role: "user" | "admin" | "worker"
}