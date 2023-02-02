import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {TestBed} from '@angular/core/testing'
import {JwtHelperService} from '@auth0/angular-jwt'

import {environment} from 'src/environments/environment'
import {AuthService} from './auth.service'
import {IAuthServerResponse} from 'src/app/auth/auth.interface'

interface IJwtHelperServiceSpy {
  decodeToken: jasmine.Spy
}

const MOCK_LOGIN_DATA: IAuthServerResponse = {
  accessToken: '',
  refreshToken: '',
  user: {email: '', id: '', fullName: ''},
  id: '',
  email: 'test@email.com',
  iat: 0,
  exp: 0,
}

describe('AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController

  let JwtHelperServiceSpy: IJwtHelperServiceSpy

  beforeEach(() => {
    JwtHelperServiceSpy = jasmine.createSpyObj(['decodeToken'])

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
    expect(service).withContext("service wasn't created").toBeTruthy()
  })

  it('should login method work', () => {
    service
      .login({email: 'test@email.com', password: ''})
      .subscribe((serverResponse: IAuthServerResponse) => {
        expect(serverResponse)
          .withContext("server doesn't returned response")
          .toBeTruthy()

        expect(serverResponse.email)
          .withContext("wrong user's email")
          .toBe('test@email.com')

        expect(JwtHelperServiceSpy.decodeToken)
          .withContext('have to be called one time')
          .toHaveBeenCalledTimes(1)
      })

    const req = httpTestingController.expectOne(
      `${environment.API_URL}/auth/login`
    )
    expect(req.request.method)
      .withContext('wrong method, must be POST')
      .toEqual('POST')
    req.flush(MOCK_LOGIN_DATA)
  })

  afterEach(() => {
    httpTestingController.verify()
  })
})
