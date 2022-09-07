import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {BlogEffects} from 'src/app/store/blog-store/blog.effects'
import {blogReducer} from 'src/app/store/blog-store/blog.reducer'
import {PostService} from 'src/app/blog/services/post.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('blog', blogReducer),
    EffectsModule.forFeature([BlogEffects]),
  ],
  providers: [PostService],
})
export class BlogStoreModule {}
