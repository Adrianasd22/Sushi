import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "../components/context/ToastContext"
import {
  createCategory,
  updateCategory,
  getCategoryById
} from "../services/CategoryService"

export default function CategoryFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const isEdit = !!id

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)

  // Cargar categoría si es edición
  useEffect(() => {
    if (!isEdit) return

    getCategoryById(Number(id))
      .then(data => {
        setName(data.name)
        setLoading(false)
      })
      .catch(() => {
        showToast("No se pudo cargar la categoría", "error")
        navigate("/categories")
      })
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (isEdit) {
        await updateCategory(Number(id), { name })
        showToast("Categoría actualizada", "success")
      } else {
        await createCategory({ name })
        showToast("Categoría creada", "success")
      }

      navigate("/categories")
    } catch {
      showToast("Error al guardar categoría", "error")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-zinc-400 p-6">Cargando categoría...</p>
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-100">
        {isEdit ? "Editar categoría" : "Nueva categoría"}
      </h1>

      <div className="bg-zinc-900 p-6 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la categoría"
            required
            className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />

          {submitting && (
            <p className="text-sm text-zinc-400">Guardando...</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-2 rounded-md bg-zinc-100 text-zinc-900 hover:bg-white disabled:opacity-50"
          >
            {submitting ? "Guardando..." : "Guardar"}
          </button>

        </form>
      </div>
    </div>
  )
}