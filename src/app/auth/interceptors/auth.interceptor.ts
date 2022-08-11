import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { catchError, Observable, switchMap, throwError} from 'rxjs'
import { select, Store } from '@ngrx/store'

import { getTokens } from 'src/app/store/auth-store/auth.selectors'
import { refresh } from 'src/app/store/auth-store/auth.actions'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string | undefined
  private refresh = false

  constructor( 
    private readonly store: Store
  ) {
    this.store.pipe(select(getTokens)).subscribe(tokens => this.token = tokens?.accessToken)
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      })

      return next.handle(clonedRequest)
      // .pipe(
      //   catchError((err: HttpErrorResponse) => {
      //     if (err.status === 401 && !this.refresh) {
      //       this.refresh = true 

      //       this.store.dispatch(refresh())
      //       console.log(this.token) // =================
      //       const clonedRequest = request.clone({
      //         setHeaders: {
      //           Authorization: `Bearer ${this.token}`
      //         }
      //       })
      //       return next.handle(clonedRequest)
      //     }

      //     this.refresh = false
      //     return throwError(() => err)
      // }))
    }

    return next.handle(request)
  }
}