import { createReducer, on } from "@ngrx/store"
import { IAuthState } from "src/app/auth/auth.interface"
import { register, registerFailure, registerSuccess } from "./register.actions"

const initialState: IAuthState = {
  loaded: false,
  loading: false,
  serverError: ''
}

export const registerReducer = createReducer(
  initialState,

  on(register, state => ({
    ...state,
    loading: true
  })),

  on(registerSuccess, (state, serverResponse) => ({
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
  }))
)