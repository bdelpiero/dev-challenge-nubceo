import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { delay, hash } from '../../helpers'
import { useLocalStorage } from '../useLocalStorage'
import { initialState, loginReducer } from './reducer'
import { ACTION_TYPES, IAuthContext, User, Users } from './types'
import { validateLogin, validateSignUp } from './validate'

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

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

  const login = async (user: User) => {
    dispatch({ type: ACTION_TYPES.loading })
    await delay(1000)
    try {
      validateLogin(users, user)
      dispatch({ type: ACTION_TYPES.login, payload: user })
      navigate('/', { replace: true })
    } catch (e: any) {
      dispatch({ type: ACTION_TYPES.loginError, payload: e })
    }
  }

  const logout = async () => {
    dispatch({ type: ACTION_TYPES.loading })
    await delay(1000)
    dispatch({ type: ACTION_TYPES.logout })
    navigate('/login', { replace: true })
  }

  const signUp = async (user: User) => {
    if (!user) return
    dispatch({ type: ACTION_TYPES.loading })
    await delay(1000)
    try {
      validateSignUp(users, user)
      setUsers((users) => ({ ...users, [user.email]: hash(user.password) }))
      dispatch({ type: ACTION_TYPES.signUp, payload: user })
      navigate('/', { replace: true })
    } catch (e: any) {
      dispatch({ type: ACTION_TYPES.singUpError, payload: e })
    }
  }

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      signUp: signUp,
    }),
    [state.user, state.loading, state.loginError, state.signUpError]
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
