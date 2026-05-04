import { Package, Home, LineChart, ClipboardList, CalendarDays, Users, Tags, LayoutGrid, Utensils, Map } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import { useRole } from "../../hooks/useRole";

interface SidebarNavProps {
  collapsed: boolean
}

function SidebarNav({collapsed}:SidebarNavProps) {
  const role = useRole();
  const isAdmin = role === "admin";
  
  return (  
    <nav className="flex-1 px-3 py-4 space-y-1">
      <SidebarNavItem icon={Home} label="Inicio" to="/" collapsed={collapsed}/>
      <SidebarNavItem icon={Package} label="Productos" to="/products" collapsed={collapsed}/>
      <SidebarNavItem icon={Tags} label="Categorias" to="/categories" collapsed={collapsed}/>

      {isAdmin && (
        <>
          <SidebarNavItem icon={Users} label="Usuarios" to="/users" collapsed={collapsed}/>
          <SidebarNavItem icon={LineChart} label="Ventas" to="/ventas_ingresos" collapsed={collapsed}/>
          <SidebarNavItem icon={LayoutGrid} label="Lista mesas" to="/tables-list" collapsed={collapsed}/>
          <SidebarNavItem icon={ClipboardList} label="Lista pedidos" to="/order-list" collapsed={collapsed}/>
        </>
      )}

      {/* Divider */}
      <div className="my-4 border-t border-zinc-800" />
      <SidebarNavItem icon={ClipboardList} label="Pedidos" to="/orders" collapsed={collapsed}/>
      <SidebarNavItem icon={Utensils} label="Mesas" to="/tables" collapsed={collapsed}/>
      <SidebarNavItem icon={Map} label="Mapa mesas" to="/tables-map" collapsed={collapsed}/>
      <SidebarNavItem icon={CalendarDays} label="Reservas" to="/reservas" collapsed={collapsed}/>
    </nav>
  );
}

export default SidebarNav;
