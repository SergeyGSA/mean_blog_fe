import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

import { BlogComponent } from './blog/blog.component'
import { SharedStoreModule } from '../store/shared-store/shared-store.module'
import { PostTileComponent } from './post-tile/post-tile.component'
import { PostService } from './services/post.service'
import { NavMenuComponent } from '../shared/nav-menu/nav-menu.component'
import { FooterComponent } from '../shared/footer/footer.component'

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
    SharedStoreModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    // ===== Standalone =======
    NavMenuComponent,
    FooterComponent
    // ===== /Standalone =======
  ],
  providers: [PostService]
})
export class BlogModule { }
