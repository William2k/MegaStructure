import { Action } from '@ngrx/store';
import { Site, SitePage } from 'src/app/core/models/site.model';

export enum ActionTypes {
  SAVE_SITE_REQUEST = '[Site] Save Site Request',
  SAVE_SITE_FAILURE = '[Site] Save Site Failure',
  SAVE_SITE_SUCCESS = '[Site] Save Site Success',
  SAVE_PAGE_REQUEST = '[Site] Save Page Request',
  SAVE_PAGE_FAILURE = '[Site] Save Page Failure',
  SAVE_PAGE_SUCCESS = '[Site] Save Page Success',
  GET_SITES_REQUEST = '[Site] Get Sites Request',
  GET_SITES_SKIP = '[Site] Get Sites Skip',
  GET_SITES_FAILURE = '[Site] Get Sites Failure',
  GET_SITES_SUCCESS = '[Site] Get Sites Success'
}

// Save Site
export class SaveSiteRequestAction implements Action {
  readonly type = ActionTypes.SAVE_SITE_REQUEST;
  constructor(public payload: { site: Site }) {}
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

export class GetSitesSkipAction implements Action {
  readonly type = ActionTypes.GET_SITES_SKIP;
}

export class GetSitesSuccessAction implements Action {
  readonly type = ActionTypes.GET_SITES_SUCCESS;
  constructor(public payload: { result: Site[] }) {}
}

// Save Page
export class SavePageRequestAction implements Action {
  readonly type = ActionTypes.SAVE_PAGE_REQUEST;
  constructor(public payload: { sitename: string, page: SitePage }) {}
}

export class SavePageFailureAction implements Action {
  readonly type = ActionTypes.SAVE_PAGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SavePageSuccessAction implements Action {
  readonly type = ActionTypes.SAVE_PAGE_SUCCESS;
  constructor(public payload: { result: SitePage }) {}
}

export type Actions =
  | SaveSiteRequestAction
  | SaveSiteFailureAction
  | SaveSiteSuccessAction
  | GetSitesRequestAction
  | GetSitesSkipAction
  | GetSitesFailureAction
  | GetSitesSuccessAction
  | SavePageRequestAction
  | SavePageFailureAction
  | SavePageSuccessAction;
