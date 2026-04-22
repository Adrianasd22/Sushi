import { User, UserCog } from "lucide-react"
import RowActions from "../buttons/RowActions"
import type { User as UserType } from "./mockUsers"

interface UserItemProps {
  user: UserType
}

function UserItem({ user }: UserItemProps) {
  const Icon = user.role === "admin" ? UserCog : User

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Icono */}
      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-zinc-700">
        <Icon size={22} />
      </div>

      {/* Información */}
      <div className="flex-1">
        <p className="font-semibold text-zinc-100">
          {user.name}
        </p>
        <p className="text-sm text-zinc-400">
          {user.email}
        </p>
        <span
          className={`
            text-xs mt-1 inline-block
            ${user.role === "admin" ? "text-red-400" : "text-zinc-500"}
          `}
        >
          {user.role}
        </span>
      </div>

      {/* Acciones */}
      <RowActions />
    </div>
  )
}

export default UserItem