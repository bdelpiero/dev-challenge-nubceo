export type User = {
  email: string
  password: string
} | null

export interface IAuthContext {
  user: User | null
  loading: boolean
  error: Error | null
  login: (user: User) => void
  logout: () => void
}

export interface State {
  user: User
  loading: boolean
  error: Error | null
}

export enum ACTION_TYPES {
  loading = 'loading',
  login = 'login',
  logout = 'logout',
  error = 'error',
}

export type Action =
  | { type: ACTION_TYPES.loading }
  | { type: ACTION_TYPES.login; payload: User }
  | { type: ACTION_TYPES.logout }
  | { type: ACTION_TYPES.error; payload: Error }
