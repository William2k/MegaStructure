import { Action } from '@ngrx/store';
import { Site } from 'src/app/core/models/site.model';

export enum ActionTypes {
  ADD_SITE_REQUEST = '[Site] Add Site Request',
  ADD_SITE_FAILURE = '[Site] Add Site Failure',
  ADD_SITE_SUCCESS = '[Site] Add Site Success',
  GET_SITES_REQUEST = '[Site] Get Sites Request',
  GET_SITES_FAILURE = '[Site] Get Sites Failure',
  GET_SITES_SUCCESS = '[Site] Get Sites Success'
}

// Add Site
export class AddSiteRequestAction implements Action {
  readonly type = ActionTypes.ADD_SITE_REQUEST;
  constructor(public payload: { form: Site }) {}
}

export class AddSiteFailureAction implements Action {
  readonly type = ActionTypes.ADD_SITE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class AddSiteSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SITE_SUCCESS;
  constructor(public payload: { result: Site }) {}
}

// Get Sites
export class GetSitesRequestAction implements Action {
  readonly type = ActionTypes.GET_SITES_REQUEST;
}

export class GetSitesFailureAction implements Action {
  readonly type = ActionTypes.GET_SITES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class GetSitesSuccessAction implements Action {
  readonly type = ActionTypes.GET_SITES_SUCCESS;
  constructor(public payload: { result: Site[] }) {}
}

export type Actions =
  | AddSiteRequestAction
  | AddSiteFailureAction
  | AddSiteSuccessAction
  | GetSitesRequestAction
  | GetSitesFailureAction
  | GetSitesSuccessAction;
