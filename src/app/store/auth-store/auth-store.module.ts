import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { registerReducer } from './register/register.reducer'
import { RegisterEffects } from './register/register.effects'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('register', registerReducer),
    EffectsModule.forFeature([RegisterEffects])
  ]
})
export class AuthStoreModule { }
