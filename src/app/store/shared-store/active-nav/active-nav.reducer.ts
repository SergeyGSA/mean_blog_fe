import { createReducer, on } from "@ngrx/store"
import { signIn, signUp } from './active-nav.actions'

export interface INavLinks {
  signIn: string,
  signUp: string
}

const initialState: INavLinks = {
  signIn: '',
  signUp: ''
}

export const activeNavReducer = createReducer(
  initialState,

  on(signIn, state => ({
    ...state,
    signIn: 'primary',
    signUp: ''
  })),

  on(signUp, state => ({
    ...state,
    signIn: '',
    signUp: 'primary'
  }))
)