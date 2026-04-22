import UserItem from "../components/users/UserItem"
import { mockUsers } from "../components/users/mockUsers"

function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Título */}
      <h1 className="text-2xl font-semibold">
        Usuarios
      </h1>

      {/* Listado */}
      <div className="bg-zinc-900 rounded-md divide-y divide-zinc-800">
        {mockUsers.map(user => (
          <UserItem
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default UsersPage
