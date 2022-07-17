import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'

import { activeNavReducer } from '../shared-store/active-nav/active-nav.reducer'




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('activeNav', activeNavReducer)
  ]
})
export class SharedStoreModule { }
