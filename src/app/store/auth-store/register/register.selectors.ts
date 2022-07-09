import { createFeatureSelector, createSelector } from "@ngrx/store"
import { IAuthState } from "../../../auth/auth.interface"

const getFeature = createFeatureSelector<IAuthState>('register')

export const getLoading = createSelector(
  getFeature,
  state => state.loading
)

export const getLoaded = createSelector(
  getFeature,
  state => state.loaded
)

export const getServerError = createSelector(
  getFeature,
  state => state.serverError
)
