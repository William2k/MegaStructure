import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './state';
import { User } from 'src/app/core/models/user.model';

export const getAccountState = createFeatureSelector<State>('account');

export const getUserState = createSelector(
  getAccountState,
  (state: State) => state.user
);

export const getCurrentUsername = createSelector(
  getUserState,
  (user: User) => user.username
);
