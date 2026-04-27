interface Props {
  name: string
  done: boolean
}

function OrderItemRow({ name, done }: Props) {
  return (
    <label className="flex items-center gap-3 py-1 text-sm">
      <input
        type="checkbox"
        checked={done}
        readOnly
        className="accent-red-500"
      />
      <span className={done ? "line-through text-zinc-500" : ""}>
        {name}
      </span>
    </label>
  )
}

export default OrderItemRow
