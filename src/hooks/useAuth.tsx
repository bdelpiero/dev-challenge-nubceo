import { createContext, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"

// TODO: move to types file
interface User {
  name: string
  password: string
}

interface IAuthContext {
  user: User | null
  login: (user: User) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null)
  const navigate = useNavigate()

  const login = async (user: User) => {
    setUser(user)
    navigate("/", { replace: true })
  }

  const logout = () => {
    setUser(null)
    navigate("/login", { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
