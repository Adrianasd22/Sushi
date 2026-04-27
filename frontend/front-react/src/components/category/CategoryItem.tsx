import type { Category } from "../../types/category"

interface Props {
  category: Category
}

function CategoryItem({ category }: Props) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-zinc-100 font-medium">
        {category.name}
      </span>

      <span className="text-zinc-500 text-sm">
        ID: {category.id}
      </span>
    </div>
  )
}

export default CategoryItem