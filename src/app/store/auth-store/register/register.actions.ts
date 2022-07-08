import { createAction, props } from "@ngrx/store"
import { IAuthServerResponse, IRegisterData } from "../../../auth/auth.interface"

export const register = createAction('[Auth] register', props<IRegisterData>())
export const registerSuccess = createAction('[Auth] register success', props<IAuthServerResponse>())
export const registerFailure = createAction('[Auth] register failure', props<{serverError: string}>())