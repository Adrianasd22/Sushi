interface Props {
  open: boolean
  title?: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  loading?:boolean
}

export default function ConfirmDialog({
  open,
  title = "Confirmación",
  message,
  onConfirm,
  onCancel,
  loading
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-zinc-900 p-6 rounded-md w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        <p className="text-sm text-zinc-400">{message}</p>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
             disabled={loading}
            className={`px-4 py-2 text-sm rounded-md text-white transition
                ${loading 
                ? "bg-red-800 cursor-not-allowed opacity-70" 
                : "bg-red-600 hover:bg-red-500"
                }`}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  )
}