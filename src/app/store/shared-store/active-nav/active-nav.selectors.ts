import {createFeatureSelector, createSelector} from '@ngrx/store'
import {INavLinks} from 'src/app/store/shared-store/active-nav/active-nav.reducer'

const getFeature = createFeatureSelector<INavLinks>('activeNav')

export const getSignIn = createSelector(getFeature, (state) => state.signIn)

export const getSignUp = createSelector(getFeature, (state) => state.signUp)
