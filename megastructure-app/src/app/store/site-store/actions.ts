import { Action } from '@ngrx/store';
import { Site } from 'src/app/core/models/site.model';

export enum ActionTypes {
  SAVE_SITE_REQUEST = '[Site] Save Site Request',
  SAVE_SITE_FAILURE = '[Site] Save Site Failure',
  SAVE_SITE_SUCCESS = '[Site] Save Site Success',
  GET_SITES_REQUEST = '[Site] Get Sites Request',
  GET_SITES_FAILURE = '[Site] Get Sites Failure',
  GET_SITES_SUCCESS = '[Site] Get Sites Success'
}

// Add Site
export class SaveSiteRequestAction implements Action {
  readonly type = ActionTypes.SAVE_SITE_REQUEST;
  constructor(public payload: { form: Site }) {}
}

export class SaveSiteFailureAction implements Action {
  readonly type = ActionTypes.SAVE_SITE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SaveSiteSuccessAction implements Action {
  readonly type = ActionTypes.SAVE_SITE_SUCCESS;
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
  | SaveSiteRequestAction
  | SaveSiteFailureAction
  | SaveSiteSuccessAction
  | GetSitesRequestAction
  | GetSitesFailureAction
  | GetSitesSuccessAction;