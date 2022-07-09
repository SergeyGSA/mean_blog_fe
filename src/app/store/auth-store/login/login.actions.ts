import { createAction, props } from "@ngrx/store"
import { IAuthServerResponse, ILoginData } from "src/app/auth/auth.interface"

export const login = createAction('[Auth] login', props<ILoginData>())
export const loginSuccess = createAction('[Auth] login success', props<IAuthServerResponse>())
export const loginFailure = createAction('[Auth] login failure', props<{serverError: string}>())

