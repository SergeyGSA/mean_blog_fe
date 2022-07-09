import { createFeatureSelector, createSelector } from "@ngrx/store"
import { IAuthState } from "src/app/auth/auth.interface"

const getFeature = createFeatureSelector<IAuthState>('login')

export const getLoaded = createSelector(
  getFeature,
  state => state.loaded
)

export const getLoading = createSelector(
  getFeature,
  state => state.loading
)

export const getServerError = createSelector(
  getFeature,
  state => state.serverError
)