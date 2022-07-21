import { createAction, props } from "@ngrx/store"
import { IAuthServerResponse, ILoginData, IRegisterData } from "../../auth/auth.interface"

export const register = createAction('[Auth] register', props<IRegisterData>())
export const registerSuccess = createAction('[Auth] register success', props<IAuthServerResponse>())
export const registerFailure = createAction('[Auth] register failure', props<{serverError: string}>())

export const login = createAction('[Auth] login', props<ILoginData>())
export const loginSuccess = createAction('[Auth] login success', props<IAuthServerResponse>())
export const loginFailure = createAction('[Auth] login failure', props<{serverError: string}>())