import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { ElementType } from "react"

export interface KpiCardProps {
  label:     string
  value:     string
  delta?:    string
  positive?: boolean
  icon:      ElementType
  accent?:   boolean
}

export function KpiCard({ label, value, delta, positive, icon: Icon, accent }: KpiCardProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-xl p-5 border flex flex-col gap-3
      ${accent
        ? "bg-red-600 border-red-500 shadow-lg shadow-red-900/20"
        : "bg-zinc-900 border-zinc-800"
      }
    `}>
      {accent && (
        <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full bg-red-500/20" />
      )}

      <div className="flex items-center justify-between relative">
        <div className={`p-2 rounded-lg ${accent ? "bg-red-500/30" : "bg-zinc-800"}`}>
          <Icon size={16} className={accent ? "text-red-100" : "text-zinc-400"} />
        </div>

        {delta && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${
            accent ? "text-red-200" : positive ? "text-emerald-400" : "text-red-400"
          }`}>
            {positive
              ? <ArrowUpRight size={12} />
              : <ArrowDownRight size={12} />
            }
            {delta}
          </span>
        )}
      </div>

      <div className="relative">
        <p className={`text-2xl font-bold tracking-tight ${accent ? "text-white" : "text-zinc-100"}`}>
          {value}
        </p>
        <p className={`text-xs mt-0.5 ${accent ? "text-red-200" : "text-zinc-500"}`}>
          {label}
        </p>
      </div>
    </div>
  )
}