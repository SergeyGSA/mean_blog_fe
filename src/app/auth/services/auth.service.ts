import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from 'src/environments/environment'
import { IAuthServerResponse, ILoginData, IRegisterData } from '../auth.interface'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class AuthService {

  constructor( private readonly http: HttpClient ) { }

  public register(newUser: IRegisterData) {
    return this.http.post<IAuthServerResponse>(`${environment.API_URL}/auth/register`, newUser, httpOptions)
  }

  public login(loginData: ILoginData) {
    return this.http.post<IAuthServerResponse>(`${environment.API_URL}/auth/login`, loginData, httpOptions)
  }
}
