import { createReducer, on } from "@ngrx/store"
import { IAuthServerResponse, IAuthState } from "src/app/auth/auth.interface"
import { register, registerFailure, registerSuccess, login, loginSuccess, loginFailure } from "./auth.actions"

const initialState: IAuthState = {
  loaded: false,
  loading: false,
  serverError: ''
}

export const authReducer = createReducer(
  initialState,

  // REGISTER
  on(register, state => ({
    ...state,
    loading: true
  })),

  on(registerSuccess, (state, {type, ...serverResponse} : {type: string} & IAuthServerResponse) => ({
    ...state,
    serverResponse,
    loaded: true,
    loading: false,
    serverError: ''
  })),

  on(registerFailure, (state, {serverError}) => ({
    ...state,
    loaded: false,
    loading: false,
    serverError
  })),

  // LOGIN
  on(login, state => ({
    ...state,
    loading: true,
    serverError: ''
  })),

  on(loginSuccess, (state, {type, ...serverResponse} : {type: string} & IAuthServerResponse) => ({
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
  }))
)