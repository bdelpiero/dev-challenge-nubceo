import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../useLocalStorage"
import { initialState, loginReducer } from "./reducer"
import { IAuthContext, User } from "./types"

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

// uses setTimeout to simulate async behavior
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  // we keep a separate state to handle the user in localStorage
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>("user", null)
  const [state, dispatch] = useReducer(loginReducer, { ...initialState, user: currentUser })

  const navigate = useNavigate()

  useEffect(() => {
    setCurrentUser(state.user)
  }, [state.user])

  // TODO: add error case
  const login = (user: User) => {
    dispatch({ type: "loading" })
    setTimeout(() => {
      dispatch({ type: "login", payload: user })
      navigate("/", { replace: true })
    }, 1000)
  }

  // TODO: wrap with setTimeout to simulate loading state
  const logout = () => {
    dispatch({ type: "loading" })
    setTimeout(() => {
      dispatch({ type: "logout" })
      navigate("/login", { replace: true })
    }, 1000)
  }

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state.user, state.loading, state.error]
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
