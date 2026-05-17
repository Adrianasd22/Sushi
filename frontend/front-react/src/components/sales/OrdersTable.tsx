import type { Order } from "../../types/order"

// Badge de estado
const STATUS_STYLE: Record<string, string> = {
  completado: "text-emerald-400 bg-emerald-400/10",
  cancelado:  "text-red-400    bg-red-400/10",
  en_curso:   "text-blue-400   bg-blue-400/10",
  pendiente:  "text-amber-400  bg-amber-400/10",
}

// Badge de modo (pickup / delivery)
const MODE_STYLE: Record<string, string> = {
  pickup:   "text-indigo-400 bg-indigo-400/10",
  delivery: "text-amber-400  bg-amber-400/10",
}

const MODE_LABEL: Record<string, string> = {
  pickup:   "Recogida",
  delivery: "Delivery",
}

interface OrdersTableProps {
  orders: Order[]
  fmt:    (n: number) => string
}

// ── Fila expandible de un pedido ──────────────────────────────────────────────
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

function OrderRow({ order, fmt }: { order: Order; fmt: (n: number) => string }) {
  const [expanded, setExpanded] = useState(false)

  const totalItems = order.products.reduce((s, p) => s + p.quantity, 0)

  const statusStyle = STATUS_STYLE[order.status ?? "pendiente"] ?? "text-zinc-400 bg-zinc-400/10"
  const modeStyle   = MODE_STYLE[order.mode] ?? ""

  return (
    <>
      {/* ── Fila principal ── */}
      <div
        className="px-5 py-3 flex gap-3 items-center cursor-pointer hover:bg-zinc-800/40 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        {/* ID */}
        <span className="text-xs text-zinc-600 w-8 shrink-0 font-mono">
          #{order.id}
        </span>

        {/* Cliente */}
        <div className="w-36 shrink-0">
          <p className="text-sm text-zinc-200 truncate">{order.user.name}</p>
          <p className="text-xs text-zinc-600 truncate">{order.user.email}</p>
        </div>

        {/* Modo */}
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-20 text-center shrink-0 ${modeStyle}`}>
          {MODE_LABEL[order.mode]}
        </span>

        {/* Artículos */}
        <span className="text-sm text-zinc-500 flex-1">
          {totalItems} art.
        </span>

        {/* Total */}
        <span className="text-sm font-semibold text-zinc-100 w-20 text-right shrink-0">
          {fmt(order.total)}
        </span>

        {/* Estado */}
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-24 text-center shrink-0 ${statusStyle}`}>
          {order.status ?? "pendiente"}
        </span>

        {/* Fecha */}
        <span className="text-xs text-zinc-600 w-28 shrink-0 text-right">
          {new Date(order.created_at).toLocaleString("es-ES", {
            day: "2-digit", month: "2-digit",
            hour: "2-digit", minute: "2-digit",
          })}
        </span>

        {/* Chevron */}
        <span className="text-zinc-600 w-4 shrink-0">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </div>

      {/* ── Detalle expandido ── */}
      {expanded && (
        <div className="px-5 pb-4 bg-zinc-950/40 border-t border-zinc-800/60 space-y-3">

          {/* Datos del pedido */}
          <div className="flex flex-wrap gap-x-8 gap-y-1 pt-3">
            <div>
              <p className="text-xs text-zinc-600">Teléfono</p>
              <p className="text-sm text-zinc-300">{order.phone}</p>
            </div>
            {order.address && (
              <div>
                <p className="text-xs text-zinc-600">Dirección</p>
                <p className="text-sm text-zinc-300">{order.address}</p>
              </div>
            )}
            {order.notes && (
              <div className="max-w-sm">
                <p className="text-xs text-zinc-600">Notas</p>
                <p className="text-sm text-zinc-300 italic">"{order.notes}"</p>
              </div>
            )}
          </div>

          {/* Líneas del pedido */}
          <div className="rounded-lg overflow-hidden border border-zinc-800">
            <div className="grid grid-cols-4 px-4 py-2 bg-zinc-900 text-xs text-zinc-600">
              <span className="col-span-2">Producto</span>
              <span className="text-center">Cantidad</span>
              <span className="text-right">Subtotal</span>
            </div>
            {order.products.map(p => (
              <div
                key={p.id}
                className="grid grid-cols-4 px-4 py-2.5 border-t border-zinc-800/60
                           text-sm hover:bg-zinc-800/20 transition-colors"
              >
                <span className="col-span-2 text-zinc-300">{p.name}</span>
                <span className="text-center text-zinc-500">
                  {p.quantity} × {fmt(p.unit_price)}
                </span>
                <span className="text-right text-zinc-200 font-medium">
                  {fmt(p.quantity * p.unit_price)}
                </span>
              </div>
            ))}
            {/* Total fila */}
            <div className="grid grid-cols-4 px-4 py-2.5 border-t border-zinc-700 bg-zinc-900">
              <span className="col-span-3 text-xs text-zinc-500 text-right">Total del pedido</span>
              <span className="text-right text-sm font-bold text-zinc-100">{fmt(order.total)}</span>
            </div>
          </div>

        </div>
      )}
    </>
  )
}

// ── Tabla completa ────────────────────────────────────────────────────────────
export function OrdersTable({ orders, fmt }: OrdersTableProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

      {/* Cabecera */}
      <div className="px-5 py-4 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-100">Últimos pedidos</h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          Haz clic en un pedido para ver el detalle
        </p>
      </div>

      {/* Encabezados de columna */}
      <div className="px-5 py-2.5 bg-zinc-950/50 flex gap-3 items-center">
        {[
          { label: "#",        cls: "w-8 shrink-0" },
          { label: "Cliente",  cls: "w-36 shrink-0" },
          { label: "Modo",     cls: "w-20 shrink-0" },
          { label: "Art.",     cls: "flex-1" },
          { label: "Total",    cls: "w-20 text-right shrink-0" },
          { label: "Estado",   cls: "w-24 text-center shrink-0" },
          { label: "Fecha",    cls: "w-28 text-right shrink-0" },
          { label: "",         cls: "w-4 shrink-0" },
        ].map(h => (
          <span key={h.label} className={`text-xs text-zinc-600 ${h.cls}`}>
            {h.label}
          </span>
        ))}
      </div>

      {/* Filas */}
      <div className="divide-y divide-zinc-800/60">
        {orders.length === 0 && (
          <p className="text-xs text-zinc-600 text-center py-10">
            No hay pedidos que mostrar
          </p>
        )}
        {orders.map(order => (
          <OrderRow key={order.id} order={order} fmt={fmt} />
        ))}
      </div>

    </div>
  )
}