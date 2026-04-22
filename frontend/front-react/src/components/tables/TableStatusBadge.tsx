import type { TableStatus } from "./mockTables"

interface Props {
  status: TableStatus
}

const statusStyles = {
  free: "bg-green-500/20 text-green-400",
  occupied: "bg-yellow-500/20 text-yellow-400",
  paid: "bg-blue-500/20 text-blue-400",
}

const statusLabels = {
  free: "Libre",
  occupied: "Ocupada",
  paid: "Pagada",
}

function TableStatusBadge({ status }: Props) {
  return (
    <span
      className={`
        px-2 py-0.5 rounded-full text-xs font-medium
        ${statusStyles[status]}
      `}
    >
      {statusLabels[status]}
    </span>
  )
}

export default TableStatusBadge