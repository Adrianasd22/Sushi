import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import ProductForm from "../components/products/ProductForm"
import { getCategories } from "../services/CategoryService"
import { getProducts } from "../services/productService"

import type{ Category } from "../types/category"
import { useToast } from "../components/context/ToastContext"

function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const isEdit = !!id
  const { showToast } = useToast()

  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  const [product, setProduct] = useState(null)
  const [loadingProduct, setLoadingProduct] = useState(isEdit)

  // 🔹 Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      const data = await getCategories()
      setCategories(data)
      setLoadingCategories(false)
    }

    fetchCategories()
  }, [])

  // 🔹 Cargar producto (solo si edit)
  useEffect(() => {
    if (!isEdit) return

    const fetchProduct = async () => {
      setLoadingProduct(true)

      // ⚠️ Aquí deberías tener un endpoint tipo /products/:id
      const data = await getProducts() // temporal
      const found = data.find((p) => p.id === Number(id))

      setProduct(found)
      setLoadingProduct(false)
    }

    fetchProduct()
  }, [id, isEdit])

  // 🔹 Crear producto
  const handleCreate = async (formData: any) => {
    try {
      console.log("Crear producto:", formData)

      // 👉 aquí irá POST a Laravel
      // await createProduct(formData)
      showToast("Producto creado correctamente", "success")

      navigate("/products")
    } catch (error) {
      console.error(error)
      showToast("No se pudo crear el producto", "error")
    }
  }

  // 🔹 Actualizar producto
  const handleUpdate = async (formData: any) => {
    try {
      console.log("Actualizar producto:", formData)

      // 👉 aquí irá PUT a Laravel
      // await updateProduct(id, formData)
      showToast("Producto actualizado correctamente", "success")

      navigate("/products")
    } catch (error) {
      console.error(error)
      showToast("No se pudo actualizar el producto", "error")
    }
  }

  // ⏳ Loading estado edición
  if (isEdit && loadingProduct) {
    return <p className="text-zinc-400">Cargando producto...</p>
  }

  return (
    <div className="max-w-4xl space-y-6">

      {/* Título dinámico */}
      <h1 className="text-2xl font-semibold text-zinc-100">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h1>

      <div className="bg-zinc-900 p-6 rounded-md">
        <ProductForm
          initialData={product}
          categories={categories}
          loadingCategories={loadingCategories}
          onSubmit={isEdit ? handleUpdate : handleCreate}
        />
      </div>
    </div>
  )
}

export default ProductFormPage