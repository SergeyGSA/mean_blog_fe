import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'

import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'

import {BlogComponent} from './blog/blog.component'
import {SharedStoreModule} from 'src/app/store/shared-store/shared-store.module'
import {PostTileComponent} from 'src/app/blog/post-tile/post-tile.component'
import {PostService} from 'src/app/blog/services/post.service'
import {NavMenuComponent} from 'src/app/shared/nav-menu/nav-menu.component'
import {FooterComponent} from 'src/app/shared/footer/footer.component'

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
]

@NgModule({
  declarations: [BlogComponent, PostTileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedStoreModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    // ===== Standalone =======
    NavMenuComponent,
    FooterComponent,
    // ===== /Standalone =======
  ],
  providers: [PostService],
})
export class BlogModule {}
