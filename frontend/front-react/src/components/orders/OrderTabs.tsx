export type FilterTab = "todos" | "pendiente" | "en_curso" | "completado"

interface Tab {
  key:   FilterTab
  label: string
}

const TABS: Tab[] = [
  { key: "todos",      label: "Todos"       },
  { key: "pendiente",  label: "Pendientes"  },
  { key: "en_curso",   label: "En curso"    },
  { key: "completado", label: "Completados" },
]

interface OrderTabsProps {
  active:    FilterTab
  onChange:  (tab: FilterTab) => void
  counts:    { pendiente: number; en_curso: number; completado: number; total: number }
}

export function OrderTabs({ active, onChange, counts }: OrderTabsProps) {
  const getCount = (key: FilterTab) => {
    if (key === "todos")      return counts.total
    if (key === "pendiente")  return counts.pendiente
    if (key === "en_curso")   return counts.en_curso
    if (key === "completado") return counts.completado
    return 0
  }

  return (
    <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
      {TABS.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
            ${active === tab.key
              ? "bg-zinc-800 text-zinc-100"
              : "text-zinc-500 hover:text-zinc-300"
            }
          `}
        >
          {tab.label}
          <span className={`
            text-xs px-1.5 py-0.5 rounded-full font-mono
            ${active === tab.key
              ? "bg-zinc-700 text-zinc-300"
              : "bg-zinc-800/80 text-zinc-600"
            }
          `}>
            {getCount(tab.key)}
          </span>
        </button>
      ))}
    </div>
  )
}