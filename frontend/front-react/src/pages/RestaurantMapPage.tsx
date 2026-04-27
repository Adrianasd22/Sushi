import RestaurantMap from "../components/restaurant-map/RestaurantMap"

function RestaurantMapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Plano del restaurante
      </h1>

      <p className="text-zinc-400">
        Selecciona una mesa para consultar su estado o realizar una reserva.
      </p>

      <RestaurantMap />
    </div>
  )
}

export default RestaurantMapPage