import { Action, State } from "./types"

export const initialState: State = {
  user: null,
  loading: false,
  error: null,
}

export const loginReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true }
    case "login":
      return { ...initialState, user: action.payload }
    case "logout":
      return { ...initialState }
    case "error":
      return { ...initialState, error: action.payload }
    default:
      return state
  }
}
