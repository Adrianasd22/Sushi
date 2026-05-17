// ── BarChart ──────────────────────────────────────────────────────────────────
// Dos variantes:
//   - vertical: barras de altura proporcional (ingresos por día)
//   - horizontal: barras de anchura proporcional (pedidos por día)

interface DayStat {
  label:   string
  revenue: number
  count:   number
}

// ── Barra horizontal (usada en "Pedidos por día") ─────────────────────────────
function HorizontalBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500 w-8 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-zinc-300 w-20 text-right shrink-0">
        {value} pedido{value !== 1 ? "s" : ""}
      </span>
    </div>
  )
}

// ── Gráfico de ingresos por día (barras verticales) ───────────────────────────
export function RevenueChart({ days }: { days: DayStat[] }) {
  const max = Math.max(...days.map(d => d.revenue), 1)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-zinc-100">Ingresos por día</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Últimos 7 días · pedidos completados</p>
      </div>

      <div className="flex items-end gap-2 h-32">
        {days.map(day => {
          const pct = max > 0 ? (day.revenue / max) * 100 : 0
          return (
            <div key={day.label} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs text-zinc-500">
                {day.revenue > 0 ? `${Math.round(day.revenue)}€` : ""}
              </span>
              <div
                className="w-full bg-zinc-800 rounded-sm overflow-hidden relative"
                style={{ height: "80px" }}
              >
                <div
                  className="w-full bg-red-500 rounded-sm transition-all duration-500 absolute bottom-0"
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-zinc-500">{day.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Gráfico de pedidos por día (barras horizontales) ──────────────────────────
export function OrdersPerDayChart({ days }: { days: DayStat[] }) {
  const max = Math.max(...days.map(d => d.count), 1)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-zinc-100">Pedidos por día</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Completados · últimos 7 días</p>
      </div>
      <div className="space-y-3 pt-1">
        {days.map(day => (
          <HorizontalBar key={day.label} label={day.label} value={day.count} max={max} />
        ))}
      </div>
    </div>
  )
}