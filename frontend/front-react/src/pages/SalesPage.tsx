import { useState, useEffect, useMemo } from "react"
import { TrendingUp, ShoppingBag, Receipt, Ban } from "lucide-react"

import type { Order } from "../types/order"
import { getOrders }           from "../services/orderService"
import { KpiCard }             from "../components/sales/KpiCard"
import { RevenueChart, OrdersPerDayChart } from "../components/sales/BarChart"
import { ProductsChart }       from "../components/sales/ProductsChart"
import { OrdersTable }         from "../components/sales/OrdersTable"

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

// ── Componente ────────────────────────────────────────────────────────────────

export default function SalesPage() {
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchOrders = () => {
    setLoading(true)
    setError(null)
    getOrders()
      .then(setOrders)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [])

  // ── Estadísticas ──────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    // Ahora que status existe en la BD, filtramos correctamente.
    // Si un pedido no tiene status todavía (null/undefined), se trata como pendiente.
    const completed = orders.filter(o => o.status === "completado")
    const cancelled = orders.filter(o => o.status === "cancelado")

    // Usamos o.total directamente — ya viene calculado del backend
    const totalRevenue   = completed.reduce((s, o) => s + Number(o.total), 0)
    const avgTicket      = completed.length ? totalRevenue / completed.length : 0
    const totalCompleted = completed.length
    const totalCancelled = cancelled.length

    // Ingresos y pedidos agrupados por día
    const revenueByDay: Record<string, number> = {}
    const ordersPerDay: Record<string, number> = {}

    completed.forEach(o => {
      const d = o.created_at.slice(0, 10)
      revenueByDay[d] = (revenueByDay[d] ?? 0) + Number(o.total)
      ordersPerDay[d] = (ordersPerDay[d] ?? 0) + 1
    })

    const last7 = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      const key = date.toISOString().slice(0, 10)
      return {
        label:   DAYS[date.getDay()],
        revenue: revenueByDay[key] ?? 0,
        count:   ordersPerDay[key] ?? 0,
      }
    })

    // Productos más vendidos (de pedidos completados)
    const productCount:   Record<string, number> = {}
    const productRevenue: Record<string, number> = {}

    completed.forEach(o =>
      o.products.forEach(p => {
        productCount[p.name]   = (productCount[p.name]   ?? 0) + p.quantity
        productRevenue[p.name] = (productRevenue[p.name] ?? 0) + p.quantity * p.unit_price
      })
    )

    const topProducts = Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, qty]) => ({ name, qty, revenue: productRevenue[name] }))

    // Hora pico
    const byHour: Record<number, number> = {}
    completed.forEach(o => {
      const h = new Date(o.created_at).getHours()
      byHour[h] = (byHour[h] ?? 0) + 1
    })
    const peakHour = (
      Object.entries(byHour).sort((a, b) => b[1] - a[1])[0] ?? null
    ) as [string, number] | null

    return {
      totalRevenue,
      avgTicket,
      totalCompleted,
      totalCancelled,
      last7,
      topProducts,
      peakHour,
    }
  }, [orders])

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
          <p className="text-sm text-red-400">Error al cargar los datos</p>
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
    <div className="space-y-8 max-w-5xl">

      {/* Cabecera */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Ventas e ingresos
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Resumen de actividad · últimos 7 días
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Ingresos totales"
          value={fmt(stats.totalRevenue)}
          icon={TrendingUp}
          accent
        />
        <KpiCard
          label="Ticket medio"
          value={fmt(stats.avgTicket)}
          icon={Receipt}
        />
        <KpiCard
          label="Pedidos completados"
          value={String(stats.totalCompleted)}
          icon={ShoppingBag}
        />
        <KpiCard
          label="Pedidos cancelados"
          value={String(stats.totalCancelled)}
          icon={Ban}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart      days={stats.last7} />
        <OrdersPerDayChart days={stats.last7} />
      </div>

      {/* Productos más vendidos */}
      <ProductsChart
        products={stats.topProducts}
        peakHour={stats.peakHour}
        fmt={fmt}
      />

      {/* Últimos pedidos — más recientes primero, máx 10 */}
      <OrdersTable
        orders={[...orders].reverse().slice(0, 10)}
        fmt={fmt}
      />

    </div>
  )
}