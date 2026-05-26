import { useRole, getName } from "../../hooks/useRole";

interface SidebarHeaderProps {
  collapsed: boolean;
}
function SidebarHeader({ collapsed }: SidebarHeaderProps) {
  const role = useRole();
  const user = getName();
  const roleText = role === "admin" ? "Administrador": "Trabajador";
    
  return (
    <div className="p-4 flex flex-col items-center border-b border-zinc-800">
      <div
        className={`
            rounded-full bg-zinc-700
            transition-all duration-300
            ${collapsed ? "w-8 h-8" : "w-16 h-16"}
          `}
      />

      {!collapsed && (
        <>
          <span className="mt-3 text text-zinc-200">{user}</span>
          <span className="mt-1 text-sm text-zinc-400">{roleText}</span>
        </>
      )}
    </div>
  );
}

export default SidebarHeader;
