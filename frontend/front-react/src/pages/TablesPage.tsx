import TableCard from "../components/tables/TableCard"
import { mockTables } from "../components/tables/mockTables"

function TablesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Mesas
      </h1>

      <div
        className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {mockTables.map(table => (
          <TableCard
            key={table.id}
            table={table}
          />
        ))}
      </div>
    </div>
  )
}

export default TablesPage