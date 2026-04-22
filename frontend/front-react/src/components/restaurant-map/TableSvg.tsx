import type { TableMap } from "./mockRestaurant"

interface Props {
  table: TableMap
  selected: boolean
  onSelect: () => void
}

const statusColors = {
  free: "#22c55e",      // green-500
  reserved: "#eab308",  // yellow-500
  occupied: "#ef4444",  // red-500
}

function TableSVG({ table, selected, onSelect }: Props) {
  return (
    <g
      transform={`translate(${table.x}, ${table.y})`}
      onClick={onSelect}
      cursor="pointer"
    >
      <rect
        x={-30}
        y={-30}
        width={60}
        height={60}
        rx={8}
        fill={statusColors[table.status]}
        opacity={0.2}
        stroke={selected ? "#fff" : statusColors[table.status]}
        strokeWidth={selected ? 3 : 2}
      />

      <text
        x={0}
        y={5}
        textAnchor="middle"
        fontSize="12"
        fill="#e5e7eb"
        fontWeight="bold"
      >
        Mesa {table.id}
      </text>

      <text
        x={0}
        y={22}
        textAnchor="middle"
        fontSize="10"
        fill="#9ca3af"
      >
        {table.seats} pax
      </text>
    </g>
  )
}

export default TableSVG