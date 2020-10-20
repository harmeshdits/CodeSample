/* ngrx core moduels */
import { UserState, selectAll } from './User.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';


/* select users store */
export const courseFeatureSelector = createFeatureSelector<UserState>('users');

export const Users = createSelector(
  courseFeatureSelector,
  selectAll
)

export const areUsersLoaded = createSelector(
  courseFeatureSelector,
  (state) => state.isLoaded
)
export const isLoading = createSelector(
  courseFeatureSelector,
  (state) => state.isLoading
)

export const showError = createSelector(
  courseFeatureSelector,
  (state) => state.error
)