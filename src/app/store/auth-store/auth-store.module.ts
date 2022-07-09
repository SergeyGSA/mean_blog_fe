import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { registerReducer } from './register/register.reducer'
import { RegisterEffects } from './register/register.effects'
import { loginReducer } from './login/login.reducer'
import { LoginEffects } from './login/login.effects'
import { activeNavReducer } from './active-nav/active-nav.reducer'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('register', registerReducer),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('activeNav', activeNavReducer),
    EffectsModule.forFeature([RegisterEffects, LoginEffects])
  ]
})
export class AuthStoreModule { }
