import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, of } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'
import { AuthService } from '../../../auth/services/auth.service'
import { register, registerFailure, registerSuccess } from './register.actions'

@Injectable()
export class RegisterEffects {

  register$ = createEffect(() => this.actions$.pipe(
    ofType(register),
    switchMap(action => this.authService.register({
      email: action.email,
      fullName: action.fullName,
      password: action.password,
      avatarUrl: action.avatarUrl
    }).pipe(
      map(registerSuccessData => registerSuccess(registerSuccessData)),
      catchError(error => of(registerFailure({serverError: error.message})))
    ))

  ))

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}