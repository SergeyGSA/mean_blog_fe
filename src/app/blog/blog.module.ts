import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import {MatButtonModule} from '@angular/material/button'

import { BlogComponent } from './blog/blog.component'
import { NavMenuComponent } from './nav-menu/nav-menu.component'

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  }
]

@NgModule({
  declarations: [
    BlogComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ]
})
export class BlogModule { }
