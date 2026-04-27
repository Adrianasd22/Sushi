import { Package, Home, LineChart, ClipboardList, CalendarDays, Users } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarNavProps {
  collapsed: boolean
}

function SidebarNav({collapsed}:SidebarNavProps) {
  return (  
    <nav className="flex-1 px-3 py-4 space-y-1">
      <SidebarNavItem icon={Home} label="Inicio" to="/" collapsed={collapsed}/>
      <SidebarNavItem icon={Users} label="Usuarios" to="/users" collapsed={collapsed}/>
      <SidebarNavItem icon={LineChart} label="Ventas" to="/ventas_ingresos" collapsed={collapsed}/>
      <SidebarNavItem icon={Package} label="Productos" to="/products" collapsed={collapsed}/>
      <SidebarNavItem icon={Package} label="Categorias" to="/categories" collapsed={collapsed}/>
      <SidebarNavItem icon={Package} label="Lista mesas" to="/tables-list" collapsed={collapsed}/>
      <SidebarNavItem icon={Package} label="Lista pedidos" to="/order-list" collapsed={collapsed}/>

      {/* Divider */}
      <div className="my-4 border-t border-zinc-800" />
      <SidebarNavItem icon={ClipboardList} label="Pedidos" to="/orders" collapsed={collapsed}/>
      <SidebarNavItem icon={Package} label="Mesas" to="/tables" collapsed={collapsed}/>
      <SidebarNavItem icon={Package} label="Mapa mesas" to="/tables-map" collapsed={collapsed}/>
      <SidebarNavItem icon={CalendarDays} label="Reservas" to="/reservas" collapsed={collapsed}/>
    </nav>
  );
}

export default SidebarNav;
