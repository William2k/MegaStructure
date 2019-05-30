import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './state';

export const getAccountState = createFeatureSelector<State>('site');

export const getUserSites = createSelector(
  getAccountState,
  (state: State) => state.sites
);
