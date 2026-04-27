import { Settings, ChevronsLeft } from "lucide-react"

interface SidebarFooterProps {
  collapsed: boolean
  onToggle: () => void
}

function SidebarFooter({collapsed, onToggle}: SidebarFooterProps) {
  return (
    <div className="p-2 border-t border-zinc-800">
      <button
        
        className="
          flex items-center gap-3 w-full
          px-3 py-2 rounded-md text-sm
          text-zinc-400 hover:text-zinc-100
          hover:bg-zinc-800 transition-colors
        "
      >
        <Settings size={18} />
        {!collapsed && <span>Configuración</span>}
      </button>

      <button
        onClick={onToggle}
        className="
          flex items-center gap-3 w-full
          px-3 py-2 rounded-md text-sm
          text-zinc-400 hover:text-zinc-100
          hover:bg-zinc-800 transition-colors
        "
      >
        <ChevronsLeft size={18} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}/>
        {/* <span>Ocultar menú</span> */}
      </button>
    </div>
  )
}

export default SidebarFooter