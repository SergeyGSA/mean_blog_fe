import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { IAuthServerResponse, IRegisterData } from '../auth.interface'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(newUser: IRegisterData) {
    return this.http.post<IAuthServerResponse>(`${environment.API_URL}/auth/register`, newUser)
  }
}
