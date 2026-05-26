import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../components/context/ToastContext"
import { getProductById, createProduct, updateProduct } from "../services/productService"
import { getCategories } from "../services/CategoryService"
import ProductForm from "../components/products/ProductForm"
import type { Category } from "../types/category"
import type { Product, ProductFormData } from "../types/products"

export default function ProductFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const isEdit = !!id

  const [categories, setCategories]               = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [product, setProduct]                     = useState<Product | null>(null)
  const [loadingProduct, setLoadingProduct]       = useState(isEdit)
  const [submitting, setSubmitting]               = useState(false) //Para feedback de peticion

  // Cargar categorías
  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
      setLoadingCategories(false)
    })
  }, [])

  // Cargar producto si es edición
  useEffect(() => {
    if (!isEdit) return

    getProductById(Number(id)).then(data => {
      setProduct(data)
      
      setLoadingProduct(false)
    }).catch(() => {
      showToast("No se pudo cargar el producto", "error")
      navigate("/products")
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEdit])

  const handleSubmit = async (formData: ProductFormData) => {
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateProduct(Number(id), formData)
        showToast("Producto actualizado correctamente", "success")
      } else {
        await createProduct(formData)
        showToast("Producto creado correctamente", "success")
      }
      navigate("/products")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado"
      showToast(message, "error")
    }finally {
      setSubmitting(false)
    }
  }

  if (isEdit && loadingProduct) {
    return <p className="text-zinc-400 p-6">Cargando producto...</p>
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-100">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h1>

      <div className="bg-zinc-900 p-6 rounded-md">
        <ProductForm
          key={product?.id ?? "new"}
          initialData={product}
          categories={categories}
          loadingCategories={loadingCategories}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  )
}