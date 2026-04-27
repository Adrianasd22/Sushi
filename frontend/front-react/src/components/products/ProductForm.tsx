import { useEffect, useState } from "react"
import type{ Category } from "../../types/category"

interface Props {
  initialData?: any
  categories: Category[]
  loadingCategories: boolean
  onSubmit: (data: any) => void
}

function ProductForm({
  initialData,
  categories,
  loadingCategories,
  onSubmit
}: Props) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image: null as File | null
  })

  // 🔹 Si es edición → rellenar datos
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category_id: String(initialData.category_id),
        image: null
      })
    }
  }, [initialData])

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleFile = (e: any) => {
    setForm({
      ...form,
      image: e.target.files[0]
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-8"
    >
      {/* IZQUIERDA (imagen) */}
      <div className="flex flex-col items-center gap-4">

        <div className="w-40 h-40 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-500">
          Imagen
        </div>

        <input type="file" onChange={handleFile} />

      </div>

      {/* DERECHA (inputs) */}
      <div className="flex-1 space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md"
        />

        {/* SELECT CATEGORÍAS */}
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          disabled={loadingCategories}
          className="w-full px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md disabled:opacity-50"
        >
          {loadingCategories ? (
            <option>Cargando...</option>
          ) : (
            <>
              <option value="">Selecciona categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </>
          )}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-red-500 rounded-md"
        >
          Guardar producto
        </button>

      </div>
    </form>
  )
}

export default ProductForm