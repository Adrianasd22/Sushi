import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-5xl font-bold text-zinc-100 mb-4">
        404
      </h1>

      <p className="text-zinc-400 mb-8">
        La página que buscas no existe o no está disponible.
      </p>

      <Link
        to="/"
        className="
          inline-flex items-center gap-2
          px-4 py-2 rounded-md
          bg-zinc-800 text-zinc-100
          hover:bg-zinc-700
          transition-colors
        "
      >
        <ArrowLeft size={18} />
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFoundPage