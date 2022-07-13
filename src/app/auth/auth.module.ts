import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { AuthService } from './services/auth.service'
import { AuthStoreModule } from '../store/auth-store/auth-store.module'

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
    AuthStoreModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
