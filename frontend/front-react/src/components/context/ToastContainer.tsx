interface Toast {
  id: number
  message: string
  type: "success" | "error" | "warning"
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">

      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 rounded-md text-sm text-white
            shadow-lg min-w-200px
            animate-slide-in

            ${toast.type === "success" && "bg-green-600"}
            ${toast.type === "error" && "bg-red-600"}
            ${toast.type === "warning" && "bg-yellow-600"}
          `}
        >
          {toast.message}
        </div>
      ))}

    </div>
  )
}

export default ToastContainer