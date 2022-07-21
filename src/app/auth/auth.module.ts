import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { JwtModule } from '@auth0/angular-jwt'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { AuthService } from './services/auth.service'
import { AuthStoreModule } from '../store/auth-store/auth-store.module'
import { SharedModule } from '../shared/shared.module'
import { SharedStoreModule } from '../store/shared-store/shared-store.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth.interceptor'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthStoreModule,
    SharedModule,
    SharedStoreModule,
    JwtModule.forRoot({})
  ],
  providers: [
    AuthService,
    // TODO: Rework interceptor's provide
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,  
      multi: true
    }
  ]
})

export class AuthModule { }
