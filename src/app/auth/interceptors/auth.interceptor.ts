import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable} from 'rxjs'
import { select, Store } from '@ngrx/store'

import { getTokens } from 'src/app/store/auth-store/auth.selectors'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string | undefined

  constructor( private readonly store: Store ) {
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
    }

    return next.handle(request)
  }
}