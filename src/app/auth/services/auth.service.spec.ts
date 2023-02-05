import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import {TestBed} from '@angular/core/testing'
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'

import {environment} from 'src/environments/environment'
import {AuthService} from './auth.service'
import {IAuthServerResponse} from 'src/app/auth/auth.interface'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY'

const MOCK_SERVER_RESPONSE_DATA: Partial<IAuthServerResponse> = {
  accessToken: token,
  refreshToken: '',
  user: {email: 'test@email.com', id: '', fullName: 'fullName test'},
  email: 'test@email.com',
  iat: 0,
  exp: 0,
}

describe('AuthService', () => {
  let service: AuthService
  let httpTestingController: HttpTestingController

  let jwtHelperService: JwtHelperService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      ],
    })

    service = TestBed.inject(AuthService)
    jwtHelperService = TestBed.inject(JwtHelperService)
    httpTestingController = TestBed.inject(HttpTestingController)

    spyOn(jwtHelperService, 'decodeToken').and.callThrough()
  })

  it('should be created', () => {
    expect(service).withContext("service wasn't created").toBeTruthy()
  })

  it('should login method work', () => {
    const loginInputData = {email: 'test@email.com', password: ''}

    service
      .login(loginInputData)
      .subscribe((serverResponse: IAuthServerResponse) => {
        expect(serverResponse)
          .withContext("server doesn't returned response")
          .toBeTruthy()

        expect(serverResponse.email)
          .withContext("wrong user's email")
          .toBe('test@email.com')

        expect(jwtHelperService.decodeToken)
          .withContext('JwtHelperService have to be called one time')
          .toHaveBeenCalledTimes(1)

        expect(serverResponse.id)
          .withContext('id which decoded by JwtHelperService doesn\'t match')
          .toBe('1234567890')
      })

    const req = httpTestingController.expectOne(
      `${environment.API_URL}/auth/login`
    )
    expect(req.request.method)
      .withContext('wrong method, must be POST')
      .toEqual('POST')
    req.flush(MOCK_SERVER_RESPONSE_DATA)
  })

  it('should register method work', () => {
    const registerInputData = {
      email: 'test@email.com',
      fullName: 'fullName test',
      password: '',
    }

    service
      .register(registerInputData)
      .subscribe((serverResponse: IAuthServerResponse) => {
        expect(serverResponse)
          .withContext("server doesn't returned response")
          .toBeTruthy()

        expect(serverResponse.user.email)
          .withContext("error in user's email")
          .toBe('test@email.com')

        expect(serverResponse.user.fullName)
          .withContext("error in user's fullName")
          .toBe('fullName test')

        expect(jwtHelperService.decodeToken)
          .withContext('JwtHelperService have to be called one time')
          .toHaveBeenCalledTimes(1)

        expect(serverResponse.id)
          .withContext('id which decoded by JwtHelperService doesn\'t match')
          .toBe('1234567890')
      })

    const req = httpTestingController.expectOne(
      `${environment.API_URL}/auth/register`
    )
    expect(req.request.method)
      .withContext('wrong method, must be POST')
      .toEqual('POST')
    req.flush(MOCK_SERVER_RESPONSE_DATA)
  })

  afterEach(() => {
    httpTestingController.verify()
  })
})
