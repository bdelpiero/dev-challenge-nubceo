export type User = {
  email: string
  password: string
} | null

// users is a dictionary with emails as keys and 32bit integer hashed passwords as values
export type Users = Record<string, number> | null

export interface IAuthContext {
  user: User | null
  loading: boolean
  loginError: Error | null
  signUpError: Error | null
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
  signUp: (user: User) => Promise<void>
}

export interface State {
  user: User
  loading: boolean
  loginError: Error | null
  signUpError: Error | null
}

export enum ACTION_TYPES {
  loading = 'loading',
  login = 'login',
  logout = 'logout',
  signUp = 'signUp',
  loginError = 'loginError',
  singUpError = 'signUpError',
}

export type Action =
  | { type: ACTION_TYPES.loading }
  | { type: ACTION_TYPES.login; payload: User }
  | { type: ACTION_TYPES.logout }
  | { type: ACTION_TYPES.loginError; payload: Error }
  | { type: ACTION_TYPES.signUp; payload: User }
  | { type: ACTION_TYPES.singUpError; payload: Error }
