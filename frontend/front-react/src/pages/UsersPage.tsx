import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRole } from "../hooks/useRole"
import { getUsers} from "../services/userService"
import type { User } from "../types/user"
import UserItem from "../components/users/UserItem"
import UserSkeleton from "../components/users/UserSkeleton"

export default function UsersPage() {
  const navigate  = useNavigate()
  const role      = useRole()
  const isAdmin   = role === "admin"

  const [users, setUsers]     = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-100">Usuarios</h1>
        {isAdmin && (
          <button
            onClick={() => navigate("/users/new")}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-md text-sm font-medium hover:bg-white transition-colors"
          >
            + Nuevo usuario
          </button>
        )}
      </div>

      <div className="rounded-md divide-y divide-zinc-800">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <UserSkeleton key={i} />
          ))
        ) : (
          users.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onDeleted={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
            />
          ))
        )}
      </div>
    </div>
  )
}