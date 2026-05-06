import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  Clock, Plus, Utensils, ShoppingBag, PackageCheck,
  ChevronDown, AlertTriangle, CheckCircle2, User
} from "lucide-react"

// ── Tipos ─────────────────────────────────────────────────────────────────────

type OrderType   = "local" | "recoger" | "llevar"
type OrderStatus = "pendiente" | "en_curso" | "completado"
type FilterTab   = "todos" | OrderStatus

interface OrderLine {
  id:           number
  product_name: string
  quantity:     number
}

interface Order {
  id:           number
  user_name:    string
  total:        number
  type:         OrderType
  status:       OrderStatus
  created_at:   string
  table_number: number | null
  lines:        OrderLine[]
  notes?:       string
}

// ── Mocks ─────────────────────────────────────────────────────────────────────

const INITIAL_ORDERS: Order[] = [
  {
    id: 1, user_name: "Carlos", total: 28.50, type: "local",
    status: "pendiente", created_at: new Date(Date.now() - 25 * 60000).toISOString(),
    table_number: 4, notes: "Sin wasabi en los nigiris",
    lines: [
      { id: 1, product_name: "Nigiri salmón",      quantity: 4 },
      { id: 2, product_name: "Gyoza",               quantity: 1 },
      { id: 3, product_name: "Miso sopa",           quantity: 2 },
    ],
  },
  {
    id: 2, user_name: "Ana", total: 35.00, type: "llevar",
    status: "pendiente", created_at: new Date(Date.now() - 8 * 60000).toISOString(),
    table_number: null,
    lines: [
      { id: 4, product_name: "Dragon Roll",         quantity: 2 },
      { id: 5, product_name: "Edamame",             quantity: 1 },
    ],
  },
  {
    id: 3, user_name: "Carlos", total: 51.00, type: "local",
    status: "en_curso", created_at: new Date(Date.now() - 18 * 60000).toISOString(),
    table_number: 7,
    lines: [
      { id: 6, product_name: "Ramen",               quantity: 2 },
      { id: 7, product_name: "Tempura langostinos", quantity: 1 },
      { id: 8, product_name: "Gyoza",               quantity: 2 },
    ],
  },
  {
    id: 4, user_name: "Marta", total: 33.00, type: "recoger",
    status: "en_curso", created_at: new Date(Date.now() - 14 * 60000).toISOString(),
    table_number: null, notes: "Cliente espera en barra",
    lines: [
      { id: 9,  product_name: "Nigiri atún",        quantity: 6 },
      { id: 10, product_name: "Miso sopa",          quantity: 1 },
    ],
  },
  {
    id: 5, user_name: "Ana", total: 22.00, type: "local",
    status: "completado", created_at: new Date(Date.now() - 45 * 60000).toISOString(),
    table_number: 2,
    lines: [
      { id: 11, product_name: "Dragon Roll",        quantity: 1 },
      { id: 12, product_name: "Edamame",            quantity: 2 },
    ],
  },
  {
    id: 6, user_name: "Carlos", total: 18.00, type: "llevar",
    status: "completado", created_at: new Date(Date.now() - 60 * 60000).toISOString(),
    table_number: null,
    lines: [
      { id: 13, product_name: "Gyoza",              quantity: 2 },
      { id: 14, product_name: "Miso sopa",          quantity: 2 },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (diff < 1)  return "Ahora mismo"
  if (diff < 60) return `Hace ${diff} min`
  return `Hace ${Math.floor(diff / 60)}h ${diff % 60}min`
}

function isUrgent(dateStr: string, status: OrderStatus): boolean {
  if (status === "completado") return false
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000) > 20
}

const fmt = (n: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"

const TYPE_CONFIG: Record<OrderType, { label: string; icon: React.ElementType; color: string }> = {
  local:   { label: "Mesa",    icon: Utensils,     color: "text-blue-400   bg-blue-400/10   border-blue-400/20"   },
  llevar:  { label: "Llevar",  icon: ShoppingBag,  color: "text-amber-400  bg-amber-400/10  border-amber-400/20"  },
  recoger: { label: "Recoger", icon: PackageCheck, color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; next: string }> = {
  pendiente:  { label: "Pendiente",  color: "text-amber-400",   bg: "bg-amber-400/10",   next: "Iniciar"   },
  en_curso:   { label: "En curso",   color: "text-blue-400",    bg: "bg-blue-400/10",    next: "Completar" },
  completado: { label: "Completado", color: "text-emerald-400", bg: "bg-emerald-400/10", next: ""          },
}

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  pendiente:  "en_curso",
  en_curso:   "completado",
  completado: null,
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: "todos",      label: "Todos"       },
  { key: "pendiente",  label: "Pendientes"  },
  { key: "en_curso",   label: "En curso"    },
  { key: "completado", label: "Completados" },
]

// ── Tarjeta de pedido ─────────────────────────────────────────────────────────

interface OrderCardProps {
  order:     Order
  onAdvance: (id: number) => void
}

function OrderCard({ order, onAdvance }: OrderCardProps) {
  const [checked,  setChecked]  = useState<Set<number>>(new Set())
  const [expanded, setExpanded] = useState(order.status !== "completado")

  const toggleLine = (lineId: number) => {
    if (order.status === "completado") return
    setChecked(prev => {
      const next = new Set(prev)
      next.has(lineId) ? next.delete(lineId) : next.add(lineId)
      return next
    })
  }

  const allChecked = order.lines.length > 0 && checked.size === order.lines.length
  const urgent     = isUrgent(order.created_at, order.status)
  const typeConf   = TYPE_CONFIG[order.type]
  const TypeIcon   = typeConf.icon
  const statusConf = STATUS_CONFIG[order.status]
  const isComplete = order.status === "completado"

  return (
    <div className={`
      rounded-xl border flex flex-col overflow-hidden transition-all duration-200
      ${isComplete
        ? "bg-zinc-900/40 border-zinc-800/40"
        : urgent
          ? "bg-zinc-900 border-red-500/50 shadow-md shadow-red-900/20"
          : "bg-zinc-900 border-zinc-800"
      }
    `}>

      {/* Línea urgente */}
      {urgent && <div className="h-0.5 w-full bg-gradient-to-r from-red-600 to-red-400" />}

      {/* Cabecera */}
      <div className="p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-1.5">

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-zinc-100 font-mono">
              #{String(order.id).padStart(3, "0")}
            </span>

            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${typeConf.color}`}>
              <TypeIcon size={10} />
              {order.type === "local" && order.table_number
                ? `Mesa ${order.table_number}`
                : typeConf.label
              }
            </span>

            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConf.color} ${statusConf.bg}`}>
              {statusConf.label}
            </span>

            {urgent && (
              <span className="flex items-center gap-1 text-xs text-red-400 font-medium animate-pulse">
                <AlertTriangle size={11} />
                Urgente
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <User size={10} />
              {order.user_name}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {timeAgo(order.created_at)}
            </span>
            <span className="font-semibold text-zinc-300">{fmt(order.total)}</span>
          </div>

        </div>

        <button
          onClick={() => setExpanded(p => !p)}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300 transition-colors shrink-0"
        >
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${expanded ? "" : "-rotate-90"}`}
          />
        </button>
      </div>

      {/* Contenido expandible */}
      {expanded && (
        <>
          {/* Nota */}
          {order.notes && (
            <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-amber-400/5 border border-amber-400/15 text-xs text-amber-300 flex gap-2">
              <span>📝</span>
              <span>{order.notes}</span>
            </div>
          )}

          {/* Líneas */}
          <div className="px-4 pb-3 space-y-1">
            {order.lines.map(line => {
              const done = checked.has(line.id)
              return (
                <button
                  key={line.id}
                  onClick={() => toggleLine(line.id)}
                  disabled={isComplete}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                    transition-all duration-150 group
                    ${isComplete ? "cursor-default" : "hover:bg-zinc-800/60 cursor-pointer"}
                    ${done ? "opacity-50" : ""}
                  `}
                >
                  <div className={`
                    w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all
                    ${done
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-zinc-600 group-hover:border-zinc-400"
                    }
                  `}>
                    {done && <CheckCircle2 size={11} className="text-white" />}
                  </div>

                  <span className={`flex-1 text-sm transition-all ${done ? "line-through text-zinc-600" : "text-zinc-200"}`}>
                    {line.product_name}
                  </span>

                  <span className={`text-xs font-mono shrink-0 ${done ? "text-zinc-700" : "text-zinc-500"}`}>
                    ×{line.quantity}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Barra de progreso */}
          {!isComplete && order.lines.length > 0 && (
            <div className="px-4 pb-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${(checked.size / order.lines.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-zinc-600 shrink-0 font-mono">
                {checked.size}/{order.lines.length}
              </span>
            </div>
          )}

          {/* Botón avanzar */}
          {!isComplete && (
            <div className="px-4 pb-4">
              <button
                onClick={() => onAdvance(order.id)}
                className={`
                  w-full py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${allChecked
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  }
                `}
              >
                {statusConf.next} pedido
                {!allChecked && (
                  <span className="text-xs opacity-50 ml-1.5">· marca todos los items</span>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Resumen cuando está colapsado y completado */}
      {isComplete && !expanded && (
        <div className="px-4 pb-3 flex items-center gap-1.5 text-xs text-emerald-500/70">
          <CheckCircle2 size={11} />
          Completado · {fmt(order.total)}
        </div>
      )}

    </div>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const navigate = useNavigate()

  const [orders,    setOrders]    = useState<Order[]>(INITIAL_ORDERS)
  const [activeTab, setActiveTab] = useState<FilterTab>("todos")

  const handleAdvance = (id: number) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o
      const next = NEXT_STATUS[o.status]
      return next ? { ...o, status: next } : o
    }))
  }

  const filtered = useMemo(() =>
    activeTab === "todos"
      ? orders
      : orders.filter(o => o.status === activeTab),
    [orders, activeTab]
  )

  const counts = useMemo(() => ({
    pendiente:  orders.filter(o => o.status === "pendiente").length,
    en_curso:   orders.filter(o => o.status === "en_curso").length,
    completado: orders.filter(o => o.status === "completado").length,
  }), [orders])

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Pedidos</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {counts.pendiente > 0
              ? `${counts.pendiente} pendiente${counts.pendiente > 1 ? "s" : ""} · ${counts.en_curso} en curso`
              : counts.en_curso > 0
                ? `${counts.en_curso} en curso`
                : "Sin pedidos activos"
            }
          </p>
        </div>

        <button
          onClick={() => navigate("/orders/new")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          Nuevo pedido
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
        {TABS.map(tab => {
          const count = tab.key === "todos"
            ? orders.length
            : counts[tab.key as OrderStatus]
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                ${activeTab === tab.key
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
                }
              `}
            >
              {tab.label}
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full font-mono
                ${activeTab === tab.key
                  ? "bg-zinc-700 text-zinc-300"
                  : "bg-zinc-800/80 text-zinc-600"
                }
              `}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid de pedidos */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-600">
          <CheckCircle2 size={32} className="text-zinc-700" />
          <p className="text-sm">No hay pedidos en este estado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onAdvance={handleAdvance}
            />
          ))}
        </div>
      )}

    </div>
  )
}