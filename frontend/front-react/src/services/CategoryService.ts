import type { Category } from "../types/category"

const API_URL = "http://localhost:8080/api/categories"

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(API_URL)

    if (!res.ok) {
      throw new Error("Error al obtener categorías")
    }

    const data = await res.json()

    return data.data ?? data
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getProductById(id: number) {
  const res = await fetch(`http://localhost:8080/api/products/${id}`)
  const data = await res.json()
  return data.data ?? data
}