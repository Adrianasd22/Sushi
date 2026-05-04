import { Eye, Pencil, Trash2 } from "lucide-react"

interface RowActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="flex gap-2">

      <button
        onClick={onEdit}
        className="p-2 rounded-md hover:bg-zinc-800"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={onDelete}
        className="p-2 rounded-md hover:bg-red-600"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default RowActions