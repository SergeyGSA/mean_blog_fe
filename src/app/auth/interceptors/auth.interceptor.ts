import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { mergeMap, Observable, take } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { getTokens } from 'src/app/store/auth-store/login/login.selectors'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private readonly store: Store ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      select(getTokens),
      take(2),
      mergeMap(tokens => {
        const newRequest = tokens?.accessToken ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${tokens.accessToken}`
          } 
        }) : request
        return next.handle(newRequest)
      })
    )
  }
}