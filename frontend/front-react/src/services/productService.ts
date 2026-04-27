import type{ Product } from "../types/products"

const API_URL = "http://localhost:8080/api/products"

export async function getProducts(params?: {
    search?: string
    category_id: number
}): Promise<Product[]> {
  try {
    console.log("Haciendo fetch...");

    //Pilla los parametros para pedirlos a la API
    const query = new URLSearchParams()
    if (params?.search) {
      query.append("search", params.search)
    }
    if (params?.category_id) {
      query.append("category_id", String(params.category_id))
    }

    //Se lo adjunta en la peticion
    const response = await fetch(`${API_URL}?${query.toString()}`)

    if (!response.ok) {
      throw new Error("Error al obtener productos")
    }

    const data = await response.json()
    console.log(data);
    
    return data.data ?? data
  } catch (error) {
    console.error(error)
    return []
  }
}