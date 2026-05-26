import { useState } from "react"
import {
  Clock, ShoppingBag, PackageCheck,
  ChevronDown, AlertTriangle, CheckCircle2, User,
} from "lucide-react"
import type { Order, OrderStatus } from "../../types/order"

// ── Helpers ───────────────────────────────────────────────────────────────────

export function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (diff < 1)  return "Ahora mismo"
  if (diff < 60) return `Hace ${diff} min`
  return `Hace ${Math.floor(diff / 60)}h ${diff % 60}min`
}

function isUrgent(dateStr: string, status: OrderStatus): boolean {
  if (status === "completado" || status === "cancelado") return false
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000) > 20
}

export const fmt = (n: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"

// ── Configuración visual ──────────────────────────────────────────────────────

const MODE_CONFIG = {
  pickup: {
    label: "Recogida",
    icon:  PackageCheck,
    color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  delivery: {
    label: "Delivery",
    icon:  ShoppingBag,
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
} as const

const STATUS_CONFIG: Record<OrderStatus, {
  label: string
  color: string
  bg:    string
}> = {
  pendiente:  { label: "Pendiente",  color: "text-amber-400",   bg: "bg-amber-400/10"   },
  en_curso:   { label: "En curso",   color: "text-blue-400",    bg: "bg-blue-400/10"    },
  completado: { label: "Completado", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  cancelado:  { label: "Cancelado",  color: "text-red-400",     bg: "bg-red-400/10"     },
}

export const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  pendiente:  "en_curso",
  en_curso:   "completado",
  completado: null,
  cancelado:  null,
}

// ── Componente ────────────────────────────────────────────────────────────────

interface OrderCardProps {
  order:     Order
  onAdvance: (id: number) => void
}

export function OrderCard({ order, onAdvance }: OrderCardProps) {
  const [checked,  setChecked]  = useState<Set<number>>(new Set())
  const [expanded, setExpanded] = useState(
    order.status !== "completado" && order.status !== "cancelado"
  )

  const toggleLine = (lineId: number) => {
    if (order.status !== "en_curso") return
    setChecked(prev => {
      const next = new Set(prev)
      next.has(lineId) ? next.delete(lineId) : next.add(lineId)
      return next
    })
  }

  const allChecked = order.products.length > 0 && checked.size === order.products.length
  const urgent     = isUrgent(order.created_at, order.status)
  const modeConf   = MODE_CONFIG[order.mode]
  const ModeIcon   = modeConf.icon
  const statusConf = STATUS_CONFIG[order.status]
  const isDone     = order.status === "completado" || order.status === "cancelado"

  // ── Lógica del botón de acción ────────────────────────────────────────────
  // pendiente → botón "Iniciar pedido" siempre activo
  // en_curso  → botón "Completar pedido" solo activo cuando todos los items están marcados
  const isPendiente = order.status === "pendiente"
  const isEnCurso   = order.status === "en_curso"

  const canAdvance  = isPendiente || (isEnCurso && allChecked)

  const buttonLabel = isPendiente
    ? "Iniciar pedido"
    : "Completar pedido"

  const buttonHint = isEnCurso && !allChecked
    ? `Marca los ${order.products.length - checked.size} items restantes para completar`
    : null

  return (
    <div className={`
      rounded-xl border flex flex-col overflow-hidden transition-all duration-200
      ${isDone
        ? "bg-zinc-900/40 border-zinc-800/40"
        : urgent
          ? "bg-zinc-900 border-red-500/50 shadow-md shadow-red-900/20"
          : "bg-zinc-900 border-zinc-800"
      }
    `}>

      {/* Franja urgente */}
      {urgent && (
        <div className="h-0.5 w-full bg-linear-to-r from-red-600 to-red-400" />
      )}

      {/* ── Cabecera ── */}
      <div className="p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-1.5">

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-zinc-100 font-mono">
              #{String(order.id).padStart(3, "0")}
            </span>

            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${modeConf.color}`}>
              <ModeIcon size={10} />
              {modeConf.label}
              {order.mode === "delivery" && order.address && (
                <span className="ml-0.5 opacity-70 truncate max-w-20" title={order.address}>
                  · {order.address.split(",")[0]}
                </span>
              )}
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
              {order.user.name}
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

      {/* ── Contenido expandible ── */}
      {expanded && (
        <>
          {/* Nota */}
          {order.notes && (
            <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-amber-400/5 border border-amber-400/15 text-xs text-amber-300 flex gap-2">
              <span>📝</span>
              <span>{order.notes}</span>
            </div>
          )}

          {/* Teléfono */}
          <div className="mx-4 mb-3 text-xs text-zinc-600">
            📞 {order.phone}
          </div>

          {/* Líneas de productos */}
          <div className="px-4 pb-3 space-y-1">
            {order.products.map(line => {
              const done = checked.has(line.id)
              // Los checkboxes solo son interactivos cuando el pedido está en_curso
              const interactive = isEnCurso

              return (
                <button
                  key={line.id}
                  onClick={() => toggleLine(line.id)}
                  disabled={!interactive}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                    transition-all duration-150 group
                    ${interactive ? "hover:bg-zinc-800/60 cursor-pointer" : "cursor-default"}
                    ${done ? "opacity-50" : ""}
                  `}
                >
                  {/* Checkbox — solo visible en en_curso */}
                  <div className={`
                    w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all
                    ${!interactive
                      ? "border-zinc-800 bg-zinc-800/50"                          // gris inactivo
                      : done
                        ? "bg-emerald-500 border-emerald-500"                     // marcado
                        : "border-zinc-600 group-hover:border-zinc-400"           // desmarcado
                    }
                  `}>
                    {done && <CheckCircle2 size={11} className="text-white" />}
                  </div>

                  <span className={`flex-1 text-sm transition-all ${done ? "line-through text-zinc-600" : "text-zinc-200"}`}>
                    {line.name}
                  </span>

                  <span className={`text-xs font-mono shrink-0 ${done ? "text-zinc-700" : "text-zinc-500"}`}>
                    ×{line.quantity}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Barra de progreso — solo visible en en_curso */}
          {isEnCurso && order.products.length > 0 && (
            <div className="px-4 pb-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${(checked.size / order.products.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-zinc-600 shrink-0 font-mono">
                {checked.size}/{order.products.length}
              </span>
            </div>
          )}

          {/* Botón de acción */}
          {!isDone && (
            <div className="px-4 pb-4 space-y-1.5">
              <button
                onClick={() => canAdvance && onAdvance(order.id)}
                disabled={!canAdvance}
                className={`
                  w-full py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${canAdvance
                    ? "bg-red-600 hover:bg-red-500 text-white cursor-pointer"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  }
                `}
              >
                {buttonLabel}
              </button>

              {/* Hint solo cuando está en_curso y faltan items */}
              {buttonHint && (
                <p className="text-xs text-zinc-600 text-center">
                  {buttonHint}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* Resumen colapsado cuando está completado/cancelado */}
      {isDone && !expanded && (
        <div className="px-4 pb-3 flex items-center gap-1.5 text-xs text-emerald-500/70">
          <CheckCircle2 size={11} />
          {statusConf.label} · {fmt(order.total)}
        </div>
      )}

    </div>
  )
}