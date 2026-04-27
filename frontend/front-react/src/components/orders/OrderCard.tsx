import { CheckCircle } from "lucide-react"
import OrderItemRow from "./OrderItemRow"
import type { Order } from "./mockOrders"

interface Props {
  order: Order
}

const headerColors = {
  local: "bg-red-500",
  takeaway: "bg-red-500",
  delivery: "bg-blue-600",
}

function OrderCard({ order }: Props) {
  return (
    <div
      className={`
        border rounded-md overflow-hidden
        ${order.completed ? "opacity-50" : "border-zinc-700"}
      `}
    >
      {/* Cabecera */}
      <div
        className={`
          flex items-center justify-between
          px-4 py-2 text-sm font-semibold
          text-white
          ${headerColors[order.type]}
        `}
      >
        <span>{order.title}</span>

        {!order.completed && (
          <CheckCircle className="cursor-pointer" size={18} />
        )}
      </div>

      {/* Platos */}
      <div className="p-4 bg-zinc-900">
        {order.items.map(item => (
          <OrderItemRow
            key={item.id}
            name={item.name}
            done={item.done}
          />
        ))}
      </div>
    </div>
  )
}

export default OrderCard