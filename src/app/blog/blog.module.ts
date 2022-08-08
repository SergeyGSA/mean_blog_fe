import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

import { BlogComponent } from './blog/blog.component'
import { SharedModule } from '../shared/shared.module'
import { SharedStoreModule } from '../store/shared-store/shared-store.module'
import { PostTileComponent } from './post-tile/post-tile.component'
import { PostService } from './services/post.service'

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  }
]

@NgModule({
  declarations: [
    BlogComponent,
    PostTileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedStoreModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [PostService]
})
export class BlogModule { }
