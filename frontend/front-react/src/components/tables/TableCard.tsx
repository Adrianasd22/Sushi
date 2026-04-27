import { Utensils } from "lucide-react"
import type { Table } from "./mockTables"
import TableStatusBadge from "./TableStatusBadge"

interface TableCardProps {
  table: Table
}

function TableCard({ table }: TableCardProps) {
  const total = table.orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <button
      className="
        flex flex-col gap-3 p-4 rounded-lg
        bg-zinc-900 border border-zinc-800
        hover:border-zinc-600 transition
        text-left
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">
          Mesa {table.id}
        </span>
        <TableStatusBadge status={table.status} />
      </div>

      <div className="flex items-center gap-2 text-zinc-400">
        <Utensils size={16} />
        <span className="text-sm">
          {table.orders.length} pedidos
        </span>
      </div>

      <div className="text-sm text-zinc-300 font-medium">
        Total: {total.toFixed(2)} €
      </div>
    </button>
  )
}

export default TableCard