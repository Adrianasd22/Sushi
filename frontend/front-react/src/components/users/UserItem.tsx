import { useState } from "react"
import { Pencil, Trash2, User, UserCog } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import { deleteUser } from "../../services/userService"
import type { User as UserType } from "../../types/user"
import ConfirmDialog from "../context/ConfirmDialog"

interface UserItemProps {
  user: UserType
  onDeleted: (id: number) => void
}

function UserItem({ user, onDeleted }: UserItemProps) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const Icon = user.role === "admin" ? UserCog : User

  const [openConfirm, setOpenConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteUser(user.id)
      onDeleted(user.id)
      showToast("Usuario eliminado", "success")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado"
      showToast(message, "error")
    } finally {
      setDeleting(false)
      setOpenConfirm(false)
    }
  }

  return (
    <div className="flex items-center gap-4 py-4">

      {/* Icono */}
      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-zinc-700">
        <Icon size={22} />
      </div>

      {/* Información */}
      <div className="flex-1">
        <p className="font-semibold text-zinc-100">{user.name}</p>
        <p className="text-sm text-zinc-400">{user.email}</p>
        <span className={`text-xs mt-1 inline-block ${user.role === "admin" ? "text-red-400" : "text-zinc-500"}`}>
          {user.role}
        </span>
      </div>

      {/* Acciones */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/users/${user.id}/edit`)}
          className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => setOpenConfirm(true)}
          className="p-2 rounded-md hover:bg-red-600/20 text-zinc-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <ConfirmDialog
        open={openConfirm}
        message={`¿Deseas eliminar a ${user.name}?`}
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirm(false)}
        loading={deleting}
      />

    </div>
  )
}

export default UserItem