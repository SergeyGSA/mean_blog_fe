import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {TestBed} from '@angular/core/testing'
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'

import {AuthService} from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController
  let jwtHelper: JwtHelperService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        JwtHelperService,
      ],
    })

    service = TestBed.inject(AuthService)
    jwtHelper = TestBed.inject(JwtHelperService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  xit('checks that ', () => {})
})
