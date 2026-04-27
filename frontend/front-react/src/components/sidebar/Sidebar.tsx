import SidebarHeader from "./SidebarHeader"
import SidebarNav from "./SidebarNav"
import SidebarFooter from "./SidebarFooter"
import { useState } from "react"

function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <aside
      className={`
        h-screen
        bg-zinc-900 border-r border-zinc-800
        flex flex-col
        transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      <SidebarHeader collapsed={collapsed}/>

      <SidebarNav collapsed={collapsed}/>

      <SidebarFooter collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}/>
    </aside>
  )
}

export default Sidebar
