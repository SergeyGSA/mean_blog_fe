import { createFeatureSelector, createSelector } from "@ngrx/store"
import { IRegisterState } from "./register.reducer"

const getFeature = createFeatureSelector<IRegisterState>('register')

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
