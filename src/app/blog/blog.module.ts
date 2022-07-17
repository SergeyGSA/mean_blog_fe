import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'

import { BlogComponent } from './blog/blog.component'
import { SharedModule } from '../shared/shared.module'
import { SharedStoreModule } from '../store/shared-store/shared-store.module'

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  }
]

@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedStoreModule,
    MatButtonModule,
  ]
})
export class BlogModule { }
