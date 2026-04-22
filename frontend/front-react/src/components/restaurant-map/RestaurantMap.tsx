import { useState } from "react"
import { tables } from "./mockRestaurant"
import TableSVG from "./TableSvg"

function RestaurantMap() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null)

  return (
    <svg
      viewBox="0 0 600 420"
      className="w-full max-w-4xl bg-zinc-900 rounded-lg border border-zinc-800"
    >
      {/* Sala principal */}
      <rect
        x="20"
        y="20"
        width="560"
        height="380"
        rx="18"
        fill="#18181b"
        stroke="#3f3f46"
        strokeWidth="2"
      />

      {/* Cocina */}
      <rect
        x="380"
        y="30"
        width="180"
        height="110"
        rx="10"
        fill="#27272a"
      />
      <text
        x="470"
        y="90"
        textAnchor="middle"
        fill="#a1a1aa"
        fontSize="14"
        fontWeight="bold"
      >
        Cocina
      </text>

      {/* Baños */}
      <rect
        x="380"
        y="160"
        width="180"
        height="90"
        rx="10"
        fill="#27272a"
      />
      <text
        x="470"
        y="210"
        textAnchor="middle"
        fill="#a1a1aa"
        fontSize="14"
        fontWeight="bold"
      >
        Baños
      </text>

      {/* Mesas */}
      {tables.map(table => (
        <TableSVG
          key={table.id}
          table={table}
          selected={table.id === selectedTable}
          onSelect={() => setSelectedTable(table.id)}
        />
      ))}
    </svg>
  )
}

export default RestaurantMap
