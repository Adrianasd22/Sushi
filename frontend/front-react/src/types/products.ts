export interface Product {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  image: string | null
  // category?: Category
  // created_at: string
  // updated_at: string
}

export interface ProductFilters {
  search?: string
  category_id?: number
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  category_id: number
  image: null // por ahora siempre null
}