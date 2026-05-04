import { TrendingUp, ShoppingBag, Receipt, Ban, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useMemo } from "react"
import type { Order } from "../types/order"

// ── Mocks ─────────────────────────────────────────────────────────────────────
// Sustituir por: useEffect(() => { getOrders().then(setOrders) }, [])

const MOCK_ORDERS: Order[] = [
  { id: 1,  table_number: 3,  status: "completado", created_at: "2026-05-04T12:10:00Z", lines: [{ id:1, product_id:1, product_name:"Nigiri salmón",   quantity:2, unit_price:4.50 }, { id:2, product_id:2, product_name:"Gyoza",            quantity:1, unit_price:6.00 }] },
  { id: 2,  table_number: 7,  status: "completado", created_at: "2026-05-04T13:05:00Z", lines: [{ id:3, product_id:3, product_name:"Ramen",             quantity:2, unit_price:12.00}, { id:4, product_id:4, product_name:"Edamame",          quantity:1, unit_price:3.50 }] },
  { id: 3,  table_number: 1,  status: "cancelado",  created_at: "2026-05-04T13:30:00Z", lines: [{ id:5, product_id:1, product_name:"Nigiri salmón",   quantity:4, unit_price:4.50 }] },
  { id: 4,  table_number: 5,  status: "completado", created_at: "2026-05-04T14:00:00Z", lines: [{ id:6, product_id:5, product_name:"Dragon Roll",      quantity:2, unit_price:14.00}, { id:7, product_id:6, product_name:"Miso sopa",       quantity:2, unit_price:3.00 }] },
  { id: 5,  table_number: 9,  status: "completado", created_at: "2026-05-04T14:45:00Z", lines: [{ id:8, product_id:2, product_name:"Gyoza",            quantity:2, unit_price:6.00 }, { id:9, product_id:7, product_name:"Tempura langostinos", quantity:1, unit_price:9.00 }] },
  { id: 6,  table_number: 2,  status: "en_curso",   created_at: "2026-05-04T15:10:00Z", lines: [{ id:10,product_id:3, product_name:"Ramen",            quantity:1, unit_price:12.00}] },
  { id: 7,  table_number: 4,  status: "completado", created_at: "2026-05-03T12:30:00Z", lines: [{ id:11,product_id:5, product_name:"Dragon Roll",      quantity:3, unit_price:14.00}, { id:12,product_id:6, product_name:"Miso sopa",       quantity:3, unit_price:3.00 }] },
  { id: 8,  table_number: 6,  status: "completado", created_at: "2026-05-03T13:15:00Z", lines: [{ id:13,product_id:1, product_name:"Nigiri salmón",   quantity:6, unit_price:4.50 }, { id:14,product_id:4, product_name:"Edamame",          quantity:2, unit_price:3.50 }] },
  { id: 9,  table_number: 11, status: "completado", created_at: "2026-05-03T19:00:00Z", lines: [{ id:15,product_id:7, product_name:"Tempura langostinos",quantity:2,unit_price:9.00}, { id:16,product_id:2, product_name:"Gyoza",            quantity:3, unit_price:6.00 }] },
  { id: 10, table_number: 8,  status: "cancelado",  created_at: "2026-05-03T20:00:00Z", lines: [{ id:17,product_id:3, product_name:"Ramen",            quantity:1, unit_price:12.00}] },
  { id: 11, table_number: 3,  status: "completado", created_at: "2026-05-02T13:00:00Z", lines: [{ id:18,product_id:5, product_name:"Dragon Roll",      quantity:1, unit_price:14.00}, { id:19,product_id:1, product_name:"Nigiri salmón",   quantity:4, unit_price:4.50 }] },
  { id: 12, table_number: 10, status: "completado", created_at: "2026-05-02T14:30:00Z", lines: [{ id:20,product_id:6, product_name:"Miso sopa",        quantity:4, unit_price:3.00 }, { id:21,product_id:7, product_name:"Tempura langostinos",quantity:1,unit_price:9.00}] },
  { id: 13, table_number: 7,  status: "completado", created_at: "2026-05-01T12:00:00Z", lines: [{ id:22,product_id:2, product_name:"Gyoza",            quantity:4, unit_price:6.00 }, { id:23,product_id:3, product_name:"Ramen",            quantity:2, unit_price:12.00}] },
  { id: 14, table_number: 2,  status: "completado", created_at: "2026-05-01T20:30:00Z", lines: [{ id:24,product_id:5, product_name:"Dragon Roll",      quantity:2, unit_price:14.00}] },
  { id: 15, table_number: 5,  status: "completado", created_at: "2026-04-30T13:45:00Z", lines: [{ id:25,product_id:1, product_name:"Nigiri salmón",   quantity:8, unit_price:4.50 }, { id:26,product_id:4, product_name:"Edamame",          quantity:3, unit_price:3.50 }] },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const orderTotal = (o: Order) =>
  o.lines.reduce((sum, l) => sum + l.quantity * l.unit_price, 0)

const fmt = (n: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

// ── Subcomponentes ────────────────────────────────────────────────────────────

interface KpiProps {
  label:    string
  value:    string
  delta?:   string
  positive?: boolean
  icon:     React.ElementType
  accent?:  boolean
}

function KpiCard({ label, value, delta, positive, icon: Icon, accent }: KpiProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-xl p-5 border flex flex-col gap-3
      ${accent
        ? "bg-red-600 border-red-500 shadow-lg shadow-red-900/20"
        : "bg-zinc-900 border-zinc-800"
      }
    `}>
      {accent && <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full bg-red-500/20" />}
      <div className="flex items-center justify-between relative">
        <div className={`p-2 rounded-lg ${accent ? "bg-red-500/30" : "bg-zinc-800"}`}>
          <Icon size={16} className={accent ? "text-red-100" : "text-zinc-400"} />
        </div>
        {delta && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${
            accent ? "text-red-200" : positive ? "text-emerald-400" : "text-red-400"
          }`}>
            {positive ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
            {delta}
          </span>
        )}
      </div>
      <div className="relative">
        <p className={`text-2xl font-bold tracking-tight ${accent ? "text-white" : "text-zinc-100"}`}>
          {value}
        </p>
        <p className={`text-xs mt-0.5 ${accent ? "text-red-200" : "text-zinc-500"}`}>{label}</p>
      </div>
    </div>
  )
}

interface BarProps {
  label:   string
  value:   number
  max:     number
  total?:  string
}

function Bar({ label, value, max, total }: BarProps) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500 w-24 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-zinc-300 w-16 text-right shrink-0">{total ?? value}</span>
    </div>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function SalesPage() {
  const orders = MOCK_ORDERS

  const stats = useMemo(() => {
    const completed = orders.filter(o => o.status === "completado")
    const cancelled = orders.filter(o => o.status === "cancelado")

    const totalRevenue   = completed.reduce((s, o) => s + orderTotal(o), 0)
    const avgTicket      = completed.length ? totalRevenue / completed.length : 0
    const totalCompleted = completed.length
    const totalCancelled = cancelled.length

    // Ingresos por día (últimos 7 días)
    const revenueByDay: Record<string, number> = {}
    const ordersPerDay: Record<string, number> = {}
    completed.forEach(o => {
      const d = o.created_at.slice(0, 10)
      revenueByDay[d] = (revenueByDay[d] ?? 0) + orderTotal(o)
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

    // Productos más vendidos
    const productCount: Record<string, number> = {}
    const productRevenue: Record<string, number> = {}
    completed.forEach(o =>
      o.lines.forEach(l => {
        productCount[l.product_name]   = (productCount[l.product_name]   ?? 0) + l.quantity
        productRevenue[l.product_name] = (productRevenue[l.product_name] ?? 0) + l.quantity * l.unit_price
      })
    )
    const topProducts = Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, qty]) => ({ name, qty, revenue: productRevenue[name] }))

    // Pedidos por franja horaria
    const byHour: Record<number, number> = {}
    completed.forEach(o => {
      const h = new Date(o.created_at).getHours()
      byHour[h] = (byHour[h] ?? 0) + 1
    })
    const peakHour = Object.entries(byHour).sort((a, b) => b[1] - a[1])[0]

    return { totalRevenue, avgTicket, totalCompleted, totalCancelled, last7, topProducts, peakHour }
  }, [orders])

  const maxDayRevenue = Math.max(...stats.last7.map(d => d.revenue), 1)
  const maxProduct    = Math.max(...stats.topProducts.map(p => p.qty), 1)

  return (
    <div className="space-y-8 max-w-5xl">

      {/* Cabecera */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Ventas e ingresos</h1>
        <p className="text-sm text-zinc-500 mt-1">Resumen de actividad · últimos 7 días</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Ingresos totales"
          value={fmt(stats.totalRevenue)}
          delta="+8% vs semana ant."
          positive
          icon={TrendingUp}
          accent
        />
        <KpiCard
          label="Ticket medio"
          value={fmt(stats.avgTicket)}
          delta="+2% vs semana ant."
          positive
          icon={Receipt}
        />
        <KpiCard
          label="Pedidos completados"
          value={String(stats.totalCompleted)}
          delta="+5 vs semana ant."
          positive
          icon={ShoppingBag}
        />
        <KpiCard
          label="Pedidos cancelados"
          value={String(stats.totalCancelled)}
          delta="-1 vs semana ant."
          positive
          icon={Ban}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Ingresos por día */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Ingresos por día</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Últimos 7 días · pedidos completados</p>
          </div>

          {/* Barras verticales */}
          <div className="flex items-end gap-2 h-32">
            {stats.last7.map(day => {
              const pct = maxDayRevenue > 0 ? (day.revenue / maxDayRevenue) * 100 : 0
              return (
                <div key={day.label} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs text-zinc-500">
                    {day.revenue > 0 ? Math.round(day.revenue) + "€" : ""}
                  </span>
                  <div className="w-full bg-zinc-800 rounded-sm overflow-hidden" style={{ height: "80px" }}>
                    <div
                      className="w-full bg-red-500 rounded-sm transition-all duration-500 mt-auto"
                      style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500">{day.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pedidos por día */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Pedidos por día</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Completados · últimos 7 días</p>
          </div>
          <div className="space-y-3 pt-1">
            {stats.last7.map(day => (
              <Bar
                key={day.label}
                label={day.label}
                value={day.count}
                max={Math.max(...stats.last7.map(d => d.count), 1)}
                total={`${day.count} pedidos`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Productos más vendidos */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Productos más vendidos</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Por unidades · pedidos completados</p>
          </div>
          {stats.peakHour && (
            <div className="text-right">
              <p className="text-xs text-zinc-500">Hora pico</p>
              <p className="text-sm font-semibold text-red-400">{stats.peakHour[0]}:00h</p>
            </div>
          )}
        </div>
        <div className="space-y-3">
          {stats.topProducts.map(p => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 w-40 shrink-0 truncate">{p.name}</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${(p.qty / maxProduct) * 100}%` }}
                />
              </div>
              <span className="text-xs text-zinc-300 w-16 text-right shrink-0">{p.qty} ud.</span>
              <span className="text-xs text-zinc-500 w-16 text-right shrink-0">{fmt(p.revenue)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla últimos pedidos */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-100">Últimos pedidos</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Todos los estados</p>
        </div>

        <div className="px-5 py-2.5 bg-zinc-950/50 flex gap-4">
          {["#", "Mesa", "Artículos", "Total", "Estado", "Fecha"].map(h => (
            <span key={h} className="text-xs text-zinc-600 flex-1 first:w-8 first:flex-none last:w-36 last:flex-none">
              {h}
            </span>
          ))}
        </div>

        <div className="divide-y divide-zinc-800/60">
          {[...orders].reverse().slice(0, 8).map(order => {
            const total = orderTotal(order)
            const statusStyle = {
              completado: "text-emerald-400 bg-emerald-400/10",
              cancelado:  "text-red-400    bg-red-400/10",
              en_curso:   "text-blue-400   bg-blue-400/10",
              pendiente:  "text-amber-400  bg-amber-400/10",
            }[order.status]

            return (
              <div key={order.id} className="px-5 py-3 flex gap-4 items-center">
                <span className="text-xs text-zinc-600 w-8 shrink-0 font-mono">#{order.id}</span>
                <span className="text-sm text-zinc-300 flex-1">Mesa {order.table_number}</span>
                <span className="text-sm text-zinc-500 flex-1">
                  {order.lines.reduce((s, l) => s + l.quantity, 0)} art.
                </span>
                <span className="text-sm font-semibold text-zinc-100 flex-1">{fmt(total)}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-1 w-fit ${statusStyle}`}>
                  {order.status}
                </span>
                <span className="text-xs text-zinc-600 w-36 shrink-0 text-right">
                  {new Date(order.created_at).toLocaleString("es-ES", {
                    day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit"
                  })}
                </span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}