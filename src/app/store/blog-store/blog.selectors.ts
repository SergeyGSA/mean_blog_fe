import {createFeatureSelector, createSelector} from '@ngrx/store'
import {IBlogState} from 'src/app/blog/post.interface'

const getFeature = createFeatureSelector<IBlogState>('blog')

export const getPostLoaded = createSelector(getFeature, (state) => state.loaded)

export const getPostLoading = createSelector(
  getFeature,
  (state) => state.loading
)

export const getPostFailure = createSelector(
  getFeature,
  (state) => state.serverError
)
