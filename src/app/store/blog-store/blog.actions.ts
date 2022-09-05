import {createAction, props} from '@ngrx/store'
import {IPost} from 'src/app/blog/post.interface'

export const getPost = createAction('[Blog] get post', props<{id: string}>())
export const getPostSuccess = createAction(
  '[Blog] get post success',
  props<IPost>()
)
export const getPostFailure = createAction(
  '[Blog] get post failure',
  props<{serverError: string}>()
)

export const getAllPosts = createAction('[Blog] get all posts')
export const getAllPostsSuccess = createAction(
  '[Blog] get all posts success',
  props<IPost>()
)
export const getAllPostsFailure = createAction(
  '[Blog] get all posts failure',
  props<{serverError: string}>()
)
