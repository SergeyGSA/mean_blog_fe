import { createReducer, on } from "@ngrx/store"
import { IAuthState } from "src/app/auth/auth.interface"
import { login, loginFailure, loginSuccess } from "./login.actions"

const initialState: IAuthState = {
  loaded: false,
  loading: false,
  serverError: '',
  serverResponse: {accessToken: '', refreshToken: '', user: {id: '', email: ''}}
}

export const loginReducer = createReducer(
  initialState,

  on(login, state => ({
    ...state,
    loading: true,
    serverError: ''
  })),

  on(loginSuccess, (state, serverResponse) => ({
    ...state,
    serverResponse,
    loaded: true,
    loading: false,
    serverError: ''
  })),

  on(loginFailure, (state, {serverError}) => ({
    ...state,
    loaded: false,
    loading: false,
    serverError
  })),
)