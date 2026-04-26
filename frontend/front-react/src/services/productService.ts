import type{ Product } from "../types/products"

const API_URL = "http://localhost:8080/api/products"

export async function getProducts(): Promise<Product[]> {
  try {
    console.log("Haciendo fetch...");
    
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error("Error al obtener productos")
    }

    const data = await response.json()
    console.log(data);
    
    return data.data
  } catch (error) {
    console.error(error)
    return []
  }
}