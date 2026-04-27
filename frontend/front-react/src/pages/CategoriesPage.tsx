import { useEffect, useState } from "react"
import { getCategories } from "../services/CategoryService"
import type { Category } from "../types/category"

import CategoryItem from "../components/category/CategoryItem"
import CategorySkeleton from "../components/category/CategorySkeleton"

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const data = await getCategories()

      setCategories(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Título */}
      <h1 className="text-2xl font-semibold text-zinc-100">
        Categorías
      </h1>

      {/* LISTA */}
      <div className=" rounded-md divide-y divide-zinc-800 px-4">

        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))
          : categories.map(category => (
              <CategoryItem key={category.id} category={category} />
            ))
        }

      </div>
    </div>
  )
}

export default CategoriesPage