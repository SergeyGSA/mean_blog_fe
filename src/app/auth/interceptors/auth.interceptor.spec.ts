import {TestBed} from '@angular/core/testing'
import {Store} from '@ngrx/store'
import {provideMockStore, MockStore} from '@ngrx/store/testing'

import {AuthInterceptor} from './auth.interceptor'

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInterceptor
  let store: MockStore<{accessToken: string; refreshToken: string}>

  const initialState = {accessToken: '', refreshToken: ''}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor, provideMockStore({initialState})],
    })

    authInterceptor = TestBed.inject(AuthInterceptor)
    // FIXME: An issue is here, fix the type any
    store = TestBed.inject<any>(Store)
  })

  xit('should be created', () => {
    expect(authInterceptor).toBeTruthy()
  })
})
