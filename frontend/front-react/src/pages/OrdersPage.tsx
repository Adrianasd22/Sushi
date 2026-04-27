import OrderCard from "../components/orders/OrderCard"
import { mockOrders } from "../components/orders/mockOrders"

function OrdersPage() {
  const sortedOrders = [...mockOrders].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Pedidos
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersPage