import { Action, ACTION_TYPES, State } from './types'

export const initialState: State = {
  user: null,
  loading: false,
  loginError: null,
  signUpError: null,
}

export const loginReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.loading:
      return { ...state, loading: true }
    case ACTION_TYPES.login:
    case ACTION_TYPES.signUp:
      return { ...initialState, user: action.payload }
    case ACTION_TYPES.logout:
      return { ...initialState }
    case ACTION_TYPES.loginError:
      return { ...initialState, loginError: action.payload }
    case ACTION_TYPES.singUpError:
      return { ...initialState, signUpError: action.payload }
    default:
      return state
  }
}
