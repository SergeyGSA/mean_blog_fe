import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {TestBed} from '@angular/core/testing'
import {JwtHelperService} from '@auth0/angular-jwt'

import {AuthService} from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController
  let JwtHelperServiceSpy: any

  beforeEach(() => {
    JwtHelperServiceSpy = jasmine.createSpyObj(JwtHelperService, [
      'decodeToken',
    ])
    JwtHelperServiceSpy.decodeToken.and.returnValue('decoded token')

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {provide: JwtHelperService, useValue: JwtHelperServiceSpy},
      ],
    })

    service = TestBed.inject(AuthService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
