import {createReducer, on} from '@ngrx/store'
import {IBlogState} from 'src/app/blog/post.interface'
import {
  getPost,
  getPostFailure,
  getPostSuccess,
} from 'src/app/store/blog-store/blog.actions'

const initialState: IBlogState = {
  loaded: false,
  loading: false,
  serverError: '',
  serverResponse: null,
}

export const blogReducer = createReducer(
  initialState,

  on(getPost, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    serverError: '',
  })),

  on(getPostSuccess, (state, serverResponse) => ({
    ...state,
    serverResponse,
    loaded: true,
    loading: false,
    serverError: '',
  })),

  on(getPostFailure, (state, {serverError}) => ({
    ...state,
    loaded: false,
    loading: false,
    serverError,
  }))
)
