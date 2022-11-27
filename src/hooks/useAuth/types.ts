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

export type Action =
  | { type: "loading" }
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "error"; payload: Error }
