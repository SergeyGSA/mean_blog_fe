import { createReducer, on } from "@ngrx/store"
import { IAuthServerResponse } from "src/app/auth/auth.interface"
import { register, registerFailure, registerSuccess } from "./register.actions"

export interface IRegisterState {
  loading: boolean
  loaded: boolean
  serverError: string
  serverResponse?: IAuthServerResponse
}

const initialState: IRegisterState = {
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