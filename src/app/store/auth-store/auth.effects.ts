import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {of} from 'rxjs'
import {map, catchError, switchMap} from 'rxjs/operators'
import {IAuthServerResponse} from 'src/app/auth/auth.interface'
import {AuthService} from 'src/app/auth/services/auth.service'
import {
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from 'src/app/store/auth-store/auth.actions'

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.authService
          .register({
            email: action.email,
            fullName: action.fullName,
            password: action.password,
            avatarUrl: action.avatarUrl,
          })
          .pipe(
            map((registerSuccessData: IAuthServerResponse) =>
              registerSuccess(registerSuccessData)
            ),
            catchError((err) => of(registerFailure({serverError: err.error})))
          )
      )
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService
          .login({
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((loginSuccessData: IAuthServerResponse) =>
              loginSuccess(loginSuccessData)
            ),
            catchError((err) => of(loginFailure({serverError: err.error})))
          )
      )
    )
  )

  constructor(private actions$: Actions, private authService: AuthService) {}
}
