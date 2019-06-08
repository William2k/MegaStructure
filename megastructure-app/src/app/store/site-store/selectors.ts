import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './state';

export const getSiteState = createFeatureSelector<State>('site');

export const getUserSites = createSelector(
  getSiteState,
  (state: State) => state.sites
);
