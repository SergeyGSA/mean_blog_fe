import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { IRegisterData } from './auth.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(newUser: IRegisterData): Observable<IRegisterData> {
    return this.http.post<IRegisterData>(`${environment.API_URL}/auth/register`, newUser)
  }
}
