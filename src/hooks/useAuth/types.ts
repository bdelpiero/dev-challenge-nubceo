export type User = {
  email: string
  password: string
} | null

export interface IAuthContext {
  user: User | null
  loading: boolean
  loginError: Error | null
  login: (user: User) => void
  logout: () => void
}

export interface State {
  user: User
  loading: boolean
  loginError: Error | null
}

export enum ACTION_TYPES {
  loading = 'loading',
  login = 'login',
  logout = 'logout',
  loginError = 'loginError',
}

export type Action =
  | { type: ACTION_TYPES.loading }
  | { type: ACTION_TYPES.login; payload: User }
  | { type: ACTION_TYPES.logout }
  | { type: ACTION_TYPES.loginError; payload: Error }
