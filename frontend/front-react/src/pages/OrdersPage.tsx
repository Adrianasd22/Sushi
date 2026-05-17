import { useState, useEffect, useMemo } from "react"
import { Plus, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

import type { Order, OrderStatus } from "../types/order"
import { getOrders, updateOrderStatus } from "../services/orderService"
import { NEXT_STATUS, OrderCard } from "../components/orders/OrderCard"
import { type FilterTab, OrderTabs } from "../components/orders/OrderTabs"


export default function OrdersPage() {
  const navigate = useNavigate()

  const [orders,    setOrders]    = useState<Order[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<FilterTab>("todos")

  // ── Fetch inicial ─────────────────────────────────────────────────────────
  const fetchOrders = () => {
    setLoading(true)
    setError(null)
    getOrders()
      .then(setOrders)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [])

  // ── Avanzar estado — actualiza la BD y luego el estado local ─────────────
  const handleAdvance = async (id: number) => {
    const order = orders.find(o => o.id === id)
    if (!order) return

    const next = NEXT_STATUS[order.status]
    if (!next) return

    try {
      const updated = await updateOrderStatus(id, next as OrderStatus)
      setOrders(prev => prev.map(o => o.id === id ? updated : o))
    } catch (e) {
      console.error("No se pudo actualizar el pedido:", e)
    }
  }

  // ── Filtrado y contadores ─────────────────────────────────────────────────
  const counts = useMemo(() => ({
    total:      orders.length,
    pendiente:  orders.filter(o => o.status === "pendiente").length,
    en_curso:   orders.filter(o => o.status === "en_curso").length,
    completado: orders.filter(o => o.status === "completado").length,
  }), [orders])

  const filtered = useMemo(() =>
    activeTab === "todos"
      ? orders
      : orders.filter(o => o.status === activeTab),
    [orders, activeTab]
  )

  // ── Estados UI ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-500">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <p className="text-sm text-red-400">Error al cargar los pedidos</p>
          <p className="text-xs text-zinc-600">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-2 text-xs text-red-400 underline hover:text-red-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-5xl">

      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Pedidos
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {counts.pendiente > 0
              ? `${counts.pendiente} pendiente${counts.pendiente > 1 ? "s" : ""} · ${counts.en_curso} en curso`
              : counts.en_curso > 0
                ? `${counts.en_curso} en curso`
                : "Sin pedidos activos"
            }
          </p>
        </div>
      </div>

      {/* Tabs de filtrado */}
      <OrderTabs
        active={activeTab}
        onChange={setActiveTab}
        counts={counts}
      />

      {/* Grid de tarjetas */}
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