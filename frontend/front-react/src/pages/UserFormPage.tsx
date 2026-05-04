import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "../components/context/ToastContext"
import {
  createUser,
  updateUser,
  getUserById,
} from "../services/userService"

export default function UserFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const isEdit = !!id

  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as string,
  })

  // cargar usuario si edit
  useEffect(() => {
    if (!isEdit) return

    getUserById(Number(id))
      .then((data) => {
        setForm({
          name: data.name,
          email: data.email,
          password: "",
          role: data.role,
        })
        setLoading(false)
      })
      .catch(() => {
        showToast("No se pudo cargar el usuario", "error")
        navigate("/users")
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (isEdit) {
        await updateUser(Number(id), form)
        showToast("Usuario actualizado", "success")
      } else {
        await createUser({
            ...form,
            role:form.role,
        })
        showToast("Usuario creado", "success")
      }

      navigate("/users")
    } catch {
      showToast("Error al guardar usuario", "error")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-zinc-400 p-6">Cargando usuario...</p>
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-100">
        {isEdit ? "Editar usuario" : "Nuevo usuario"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-md space-y-4">

        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-800 rounded-md"
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-800 rounded-md"
          required
        />

        {!isEdit && (
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-800 rounded-md"
            required
          />
        )}

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value})}
          className="w-full px-4 py-2 bg-zinc-800 rounded-md"
        >
            <option value="user">Usuario</option>
          <option value="worker">Trabajador</option>
          <option value="admin">Administrador</option>
        </select>

        {submitting && (
          <p className="text-sm text-zinc-400">Guardando...</p>
        )}

        <button
          disabled={submitting}
          className="w-full bg-zinc-100 text-zinc-900 py-2 rounded-md disabled:opacity-50"
        >
          {submitting ? "Guardando..." : "Guardar usuario"}
        </button>

      </form>
    </div>
  )
}