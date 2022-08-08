import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { PostService } from 'src/app/blog/services/post.service'

@Injectable()
export class BlogEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly postService: PostService
  ) {}
}