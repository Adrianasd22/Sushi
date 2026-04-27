import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  collapsed: boolean;
}

function SidebarNavItem({ icon: Icon, label, to, collapsed, }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        group flex items-center gap-3
        w-full px-3 py-2 rounded-md text-sm font-medium
        transition-colors
        ${
          isActive
            ? "bg-zinc-800 text-zinc-100 border-zinc-400"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }
        ${collapsed ? "justify-center" : ""}
        `
      }
    >
      <Icon size={18} className={"text-zinc-400 group-hover:text-red-500"} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}

export default SidebarNavItem;
