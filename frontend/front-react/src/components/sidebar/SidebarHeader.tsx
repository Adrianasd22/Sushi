interface SidebarHeaderProps {
  collapsed: boolean;
}
function SidebarHeader({ collapsed }: SidebarHeaderProps) {
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
        <span className="mt-3 text-sm text-zinc-400">Administrador</span>
      )}
    </div>
  );
}

export default SidebarHeader;
