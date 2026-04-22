import { Eye, Pencil, Trash2 } from "lucide-react"

interface ProductItemProps {
  product: {
    name: string
    description: string
    price: number
    allergens: string[]
  }
}

function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      {/* Imagen */}
      <div className="w-16 h-16 bg-zinc-700 rounded-md shrink-0" />

      {/* Información */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-zinc-100">
            {product.name}
          </h3>

          <span className="text-sm text-zinc-300">
            {product.price.toFixed(2)} €
          </span>
        </div>

        <p className="text-sm text-zinc-400 mt-1">
          {product.description}
        </p>

        {/* Alérgenos */}
        <div className="flex gap-2 mt-2">
          {product.allergens.map((allergen, index) => (
            <span
              key={index}
              className="w-3 h-3 rounded-full bg-red-500"
              title={allergen}
            />
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-2">
        <button className="p-2 rounded-md hover:bg-zinc-800">
          <Eye size={16} />
        </button>
        <button className="p-2 rounded-md hover:bg-zinc-800">
          <Pencil size={16} />
        </button>
        <button className="p-2 rounded-md hover:bg-red-600">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default ProductItem