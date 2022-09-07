import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'

import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatProgressBarModule} from '@angular/material/progress-bar'

import {RegisterComponent} from 'src/app/auth/register/register.component'
import {LoginComponent} from 'src/app/auth/login/login.component'
import {AuthService} from 'src/app/auth/services/auth.service'
import {AuthStoreModule} from 'src/app/store/auth-store/auth-store.module'
import {SharedStoreModule} from 'src/app/store/shared-store/shared-store.module'
import {NavMenuComponent} from 'src/app/shared/nav-menu/nav-menu.component'
import {FooterComponent} from 'src/app/shared/footer/footer.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthStoreModule,
    SharedStoreModule,
    // ===== Standalone =======
    NavMenuComponent,
    FooterComponent,
    // ===== /Standalone =======
    MatProgressBarModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
