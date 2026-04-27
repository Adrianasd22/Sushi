import { createContext, useContext, useState } from "react"
import type{ ReactNode } from "react"
import ToastContainer from "./ToastContainer"

type ToastType = "success" | "error" | "warning"

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

interface ToastProviderProps {
  children: ReactNode
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: ToastType = "success") => {
    const id = Date.now()

    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast debe usarse dentro de ToastProvider")
  return context
}