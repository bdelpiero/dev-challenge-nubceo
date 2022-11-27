import { Action, ACTION_TYPES, State } from './types'

export const initialState: State = {
  user: null,
  loading: false,
  error: null,
}

export const loginReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.loading:
      return { ...state, loading: true }
    case ACTION_TYPES.login:
      return { ...initialState, user: action.payload }
    case ACTION_TYPES.logout:
      return { ...initialState }
    case ACTION_TYPES.error:
      return { ...initialState, error: action.payload }
    default:
      return state
  }
}
