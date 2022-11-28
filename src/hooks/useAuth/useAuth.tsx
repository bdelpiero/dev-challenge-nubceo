import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../useLocalStorage'
import { initialState, loginReducer } from './reducer'
import { ACTION_TYPES, IAuthContext, User } from './types'

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

// users is stored as an email to password dictionary
type Users = Record<string, string> | null

// TODO: add register function
// uses setTimeout to simulate async behavior
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  // we keep a separate state to handle the user in localStorage
  const [currentUser, setCurrentUser] = useLocalStorage<User>('user', null)
  const [users, setUsers] = useLocalStorage<Users>('users', null)
  const [state, dispatch] = useReducer(loginReducer, { ...initialState, user: currentUser })

  const navigate = useNavigate()

  // TODO: move to useCurrentUser hook?
  useEffect(() => {
    setCurrentUser(state.user)
  }, [state.user])

  const isValidLogin = (user: User) => {
    if (!user) return false
    if (!users || !users[user.email]) {
      dispatch({
        type: ACTION_TYPES.loginError,
        payload: new Error('This E-mail address does not exist on our database'),
      })
      return false
    }
    if (users[user.email] !== user.password) {
      dispatch({
        type: ACTION_TYPES.loginError,
        payload: new Error('Password is incorrect'),
      })
      return false
    }
    true
  }

  // TODO: add error case
  const login = (user: User) => {
    if (!isValidLogin(user)) return
    dispatch({ type: ACTION_TYPES.loading })
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.login, payload: user })
      navigate('/', { replace: true })
    }, 1000)
  }

  // TODO: wrap with setTimeout to simulate loading state
  const logout = () => {
    dispatch({ type: ACTION_TYPES.loading })
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.logout })
      navigate('/login', { replace: true })
    }, 1000)
  }

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state.user, state.loading, state.loginError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
