import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'

import { NavMenuComponent } from './nav-menu/nav-menu.component'



@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [NavMenuComponent]
})
export class SharedModule { }
