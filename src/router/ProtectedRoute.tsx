import { Navigate, useOutlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function ProtectedRoute() {
  const { user } = useAuth()
  const outlet = useOutlet()

  if (!user) {
    return <Navigate to="/login" />
  }

  return <div>{outlet}</div>
}
