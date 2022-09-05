import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {JwtHelperService} from '@auth0/angular-jwt'

import {environment} from 'src/environments/environment'
import {IAuthServerResponse, ILoginData, IRegisterData} from '../auth.interface'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
}

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  public register(newUser: IRegisterData): Observable<IAuthServerResponse> {
    return this.http
      .post<IAuthServerResponse>(
        `${environment.API_URL}/auth/register`,
        newUser,
        httpOptions
      )
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelperService.decodeToken(res.accessToken),
        }))
      )
  }

  public login(loginData: ILoginData): Observable<IAuthServerResponse> {
    return this.http
      .post<IAuthServerResponse>(
        `${environment.API_URL}/auth/login`,
        loginData,
        httpOptions
      )
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelperService.decodeToken(res.accessToken),
        }))
      )
  }
}
