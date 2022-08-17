import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, catchError, switchMap, delay } from 'rxjs/operators'
import { IAuthServerResponse } from 'src/app/auth/auth.interface'
import { AuthService } from '../../auth/services/auth.service'
import { login, loginFailure, loginSuccess, refresh, refreshSuccess, register, registerFailure, registerSuccess } from './auth.actions'

@Injectable()
export class AuthEffects {

  register$ = createEffect(() => this.actions$.pipe(
    ofType(register),
    switchMap(action => this.authService.register({
      email: action.email,
      fullName: action.fullName,
      password: action.password,
      avatarUrl: action.avatarUrl
    }).pipe(
      map((registerSuccessData: IAuthServerResponse) => registerSuccess(registerSuccessData)),
      catchError(err => of(registerFailure({serverError: err.error})))
    ))
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => this.authService.login({
      email: action.email,
      password: action.password,
    }).pipe(
      map((loginSuccessData: IAuthServerResponse) => loginSuccess(loginSuccessData)),
      catchError(err => of(loginFailure({serverError: err.error})))
    ))
  ))

  // refresh$ = createEffect(() => this.actions$.pipe(
  //   ofType(refresh),
  //   switchMap(() => this.authService.refresh().pipe(
  //     map((refreshSuccessData: IAuthServerResponse) => refreshSuccess(refreshSuccessData))
  //   ))
  // ))

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}
}