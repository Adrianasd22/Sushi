import ProductItem from "../components/products/ProductItem"
import { mockProducts } from "../components/products/mockProducts"

function ProductsPage() {
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
          className="
            flex-1 px-4 py-2 rounded-md
            bg-zinc-800 text-zinc-100
            placeholder:text-zinc-500
            focus:outline-none focus:ring-1 focus:ring-zinc-600
          "
        />

        <select
          className="
            px-4 py-2 rounded-md
            bg-zinc-800 text-zinc-100
            focus:outline-none
          "
        >
          <option value="">Todas las categorías</option>
          <option value="arroces">Arroces</option>
          <option value="nigiris">Nigiris</option>
          <option value="sopas">Sopas</option>
          <option value="salsas">Salsas</option>
        </select>
      </div>

      {/* Listado */}
      <div className="bg-zinc-900 rounded-md divide-y divide-zinc-800 sflex flex-col">
        {mockProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
      </div>
    </div>
  )
}

export default ProductsPage
