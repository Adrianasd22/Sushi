interface ProductStat {
  name:    string
  qty:     number
  revenue: number
}

interface ProductsChartProps {
  products:  ProductStat[]
  peakHour?: [string, number] | null
  fmt:       (n: number) => string
}

export function ProductsChart({ products, peakHour, fmt }: ProductsChartProps) {
  const max = Math.max(...products.map(p => p.qty), 1)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">Productos más vendidos</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Por unidades · pedidos completados</p>
        </div>

        {peakHour && (
          <div className="text-right">
            <p className="text-xs text-zinc-500">Hora pico</p>
            <p className="text-sm font-semibold text-red-400">{peakHour[0]}:00 h</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 w-40 shrink-0 truncate" title={p.name}>
              {p.name}
            </span>
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${(p.qty / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-zinc-300 w-14 text-right shrink-0">
              {p.qty} ud.
            </span>
            <span className="text-xs text-zinc-500 w-16 text-right shrink-0">
              {fmt(p.revenue)}
            </span>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-xs text-zinc-600 text-center py-4">Sin datos</p>
        )}
      </div>
    </div>
  )
}