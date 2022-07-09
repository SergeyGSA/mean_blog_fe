import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'
import { AuthService } from '../../../auth/services/auth.service'
import { login, loginFailure, loginSuccess } from './login.actions'

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => this.authService.login({
      email: action.email,
      password: action.password,
    }).pipe(
      map(loginSuccessData => loginSuccess(loginSuccessData)),
      catchError(error => of(loginFailure({serverError: error.message})))
    ))

  ))

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}