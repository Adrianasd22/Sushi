export interface Product {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  image: string | null
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
  image: string | null
}