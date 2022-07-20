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

export const getServerResponse = createSelector(
  getFeature,
  state => state.serverResponse
)

export const getTokens = createSelector(
  getServerResponse,
  serverResponse => serverResponse && {'accessToken': serverResponse.accessToken, 'refreshToken': serverResponse.refreshToken} 
)

export const isAuth = createSelector(
  getTokens,
  tokens => !!tokens?.accessToken
)