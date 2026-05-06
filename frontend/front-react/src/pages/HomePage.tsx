import { ArrowUpRight, ChefHat, ClipboardList, LayoutGrid, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useRole } from "../hooks/useRole"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 13) return "Buenos días"
  if (hour < 20) return "Buenas tardes"
  return "Buenas noches"
}

function getUserName(): string {
  return localStorage.getItem("name") ?? "equipo"
}

const today = new Date().toLocaleDateString("es-ES", {
  weekday: "long",
  day:     "numeric",
  month:   "long",
})

interface QuickLink {
  label: string
  desc:  string
  href:  string
  icon:  React.ElementType
  adminOnly?: boolean
}

const links: QuickLink[] = [
  { label: "Pedidos",        desc: "Gestionar pedidos activos",    href: "/orders",       icon: ClipboardList },
  { label: "Mapa de mesas",  desc: "Ver el estado del salón",      href: "/tables-map",   icon: MapPin        },
  { label: "Productos",      desc: "Catálogo y gestión",           href: "/products",     icon: LayoutGrid    },
  { label: "Ventas",         desc: "Ingresos y estadísticas",      href: "/ventas_ingresos", icon: ArrowUpRight, adminOnly: true },
]

export default function HomePage() {
  const navigate  = useNavigate()
  const role      = useRole()
  const isAdmin   = role === "admin"
  const greeting  = getGreeting()
  const name      = getUserName()

  const visibleLinks = links.filter(l => !l.adminOnly || isAdmin)

  return (
    <div className="min-h-full flex flex-col justify-between gap-16 max-w-3xl py-4">

      {/* Bloque principal */}
      <div className="space-y-10">

        {/* Saludo */}
        <div className="space-y-1">
          <p className="text-sm text-zinc-500 capitalize">{today}</p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
            {greeting},{" "}
            <span className="text-red-500">{name}</span>.
          </h1>
          <p className="text-zinc-500 text-sm pt-1">
            Bienvenido al panel de gestión de{" "}
            <span className="text-zinc-300 font-medium">Sushi Miyu</span>.
            Todo bajo control desde aquí.
          </p>
        </div>

        {/* Separador con marca */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <div className="flex items-center gap-2 text-zinc-600">
            <ChefHat size={14} />
            <span className="text-xs tracking-widest uppercase">Sushi Miyu</span>
          </div>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleLinks.map(link => {
            const Icon = link.icon
            return (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="group text-left flex items-center gap-4 p-5 rounded-xl
                  bg-zinc-900 border border-zinc-800
                  hover:border-red-500/40 hover:bg-zinc-800/50
                  transition-all duration-200"
              >
                <div className="p-2.5 rounded-lg bg-zinc-800 group-hover:bg-red-500/10 transition-colors shrink-0">
                  <Icon size={18} className="text-zinc-400 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-100 group-hover:text-red-400 transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">{link.desc}</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-zinc-700 group-hover:text-red-500 transition-all
                    opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                />
              </button>
            )
          })}
        </div>

      </div>

      {/* Pie sutil */}
      <p className="text-xs text-zinc-700 text-center">
        Sushi Miyu · Panel interno · {new Date().getFullYear()}
      </p>

    </div>
  )
}