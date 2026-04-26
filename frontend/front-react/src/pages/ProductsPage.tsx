import { useState, useEffect } from "react"
import ProductItem from "../components/products/ProductItem"
// import { mockProducts } from "../components/products/mockProducts"
import type { Product } from "../types/products"
import ProductSkeleton from "../components/products/ProductSkeleton"
import { getProducts } from "../services/productService"
import type { Category } from "../types/category"
import { getCategories } from "../services/CategoryService"

function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      const data = await getCategories()
      setCategories(data)
      setLoadingCategories(false)
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProducts(true)
      const data = await getProducts({
        search,
        category_id: selectedCategory ? Number(selectedCategory) : undefined ////Creo q esta mal
      })
      setProducts(data)
      setLoadingProducts(false)
    }

    fetchData()
  }, [search, selectedCategory])

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Título */}
      <h1 className="text-2xl font-semibold">Productos</h1>

    <div className="flex flex-col">
      {/* Barra de acciones */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="
            flex-1 px-4 py-2 rounded-md
            bg-zinc-800 text-zinc-100
            placeholder:text-zinc-500
            focus:outline-none focus:ring-1 focus:ring-zinc-600
          "
        />

        <select
          value={selectedCategory}
          onChange={(e)=>setSelectedCategory(e.target.value)}
          disabled={loadingCategories}
          className="
            px-4 py-2 rounded-md
            bg-zinc-800 text-zinc-100
            focus:outline-none
          "
        >
          {loadingCategories ? (
            <option>Cargando categorías...</option>
          ) : (
            <>
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* Listado */}
      {/* <div className="bg-zinc-900 rounded-md divide-y divide-zinc-800 sflex flex-col">
        {mockProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div> */}

        {/* LISTA de productos*/}
        <div className=" rounded-md divide-y divide-zinc-800 flex flex-col">
          {loadingProducts
            ? Array.from({ length: 5 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map(product => (
                <ProductItem key={product.id} product={product} />
              ))
          }
        </div>

      </div>
    </div>
  )
}

export default ProductsPage
