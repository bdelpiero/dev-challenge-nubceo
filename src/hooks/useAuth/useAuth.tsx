import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { hash } from '../../helpers'
import { useLocalStorage } from '../useLocalStorage'
import { initialState, loginReducer } from './reducer'
import { ACTION_TYPES, IAuthContext, User } from './types'

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

// users is a dictionary with emails as keys and 32bit integer hashed passwords as values
type Users = Record<string, number> | null

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

  // TODO: move error messages to constant
  // this function should throw errors (it shouldn't call dispatch)
  // that way it could be move outside the hooks body
  const isValidLogin = (user: User) => {
    if (!user) return false
    if (!users || !users[user.email]) {
      dispatch({
        type: ACTION_TYPES.loginError,
        payload: new Error('This E-mail address does not exist on our database'),
      })
      return false
    }
    if (users[user.email] !== hash(user.password)) {
      dispatch({
        type: ACTION_TYPES.loginError,
        payload: new Error('Password is incorrect'),
      })
      return false
    }
    return true
  }

  // TODO: could wrap these functions in a promise to improve error handling (using throw)
  // Create a common async function that dispatches the loading state and executes a callback
  // (with setTimeout) inside a promise
  const login = (user: User) => {
    if (!isValidLogin(user)) return
    dispatch({ type: ACTION_TYPES.loading })
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.login, payload: user })
      navigate('/', { replace: true })
    }, 1000)
  }

  const logout = () => {
    dispatch({ type: ACTION_TYPES.loading })
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.logout })
      navigate('/login', { replace: true })
    }, 1000)
  }

  // TODO: add signUp validations
  const signUp = (user: User) => {
    if (!user) return
    dispatch({ type: ACTION_TYPES.loading })
    setTimeout(() => {
      setUsers((users) => ({ ...users, [user.email]: hash(user.password) }))
      dispatch({ type: ACTION_TYPES.signUp, payload: user })
      navigate('/', { replace: true })
    }, 1000)
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
