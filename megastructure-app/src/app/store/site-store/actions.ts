import { Action } from '@ngrx/store';
import { Site, SitePage } from 'src/app/core/models/site.model';

export enum ActionTypes {
  GET_SITE_REQUEST = '[Site] Get Site Request',
  GET_LIVE_SITE_REQUEST = '[Site] Get Live Site Request',
  GET_SITE_SKIP = '[Site] Get Site Skip',
  GET_SITE_FAILURE = '[Site] Get Site Failure',
  GET_SITE_SUCCESS = '[Site] Get Site Success',
  GET_SITES_REQUEST = '[Site] Get Sites Request',
  GET_SITES_SKIP = '[Site] Get Sites Skip',
  GET_SITES_FAILURE = '[Site] Get Sites Failure',
  GET_SITES_SUCCESS = '[Site] Get Sites Success',
  SAVE_SITE_REQUEST = '[Site] Save Site Request',
  SAVE_SITE_FAILURE = '[Site] Save Site Failure',
  SAVE_SITE_SUCCESS = '[Site] Save Site Success',
  GET_PAGE_REQUEST = '[Site] Get Page Request',
  GET_LIVE_PAGE_REQUEST = '[Site] Get Live Page Request',
  GET_PAGE_SKIP = '[Site] Get Page Skip',
  GET_PAGE_FAILURE = '[Site] Get Page Failure',
  GET_PAGE_SUCCESS = '[Site] Get Page Success',
  SAVE_PAGE_REQUEST = '[Site] Save Page Request',
  SAVE_PAGE_FAILURE = '[Site] Save Page Failure',
  SAVE_PAGE_SUCCESS = '[Site] Save Page Success'
}

// Get Site
export class GetSiteRequestAction implements Action {
  readonly type = ActionTypes.GET_SITE_REQUEST;
  constructor(public payload: { sitename: string }) {}
}

export class GetLiveSiteRequestAction implements Action {
  readonly type = ActionTypes.GET_LIVE_SITE_REQUEST;
  constructor(public payload: { sitename: string }) {}
}

export class GetSiteFailureAction implements Action {
  readonly type = ActionTypes.GET_SITE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class GetSiteSkipAction implements Action {
  readonly type = ActionTypes.GET_SITE_SKIP;
}

export class GetSiteSuccessAction implements Action {
  readonly type = ActionTypes.GET_SITE_SUCCESS;
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

// Get Page
export class GetPageRequestAction implements Action {
  readonly type = ActionTypes.GET_PAGE_REQUEST;
  constructor(public payload: { sitename: string; pageRef: number }) {}
}

export class GetLivePageRequestAction implements Action {
  readonly type = ActionTypes.GET_LIVE_PAGE_REQUEST;
  constructor(public payload: { sitename: string; pageRef: number }) {}
}

export class GetPageFailureAction implements Action {
  readonly type = ActionTypes.GET_PAGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class GetPageSkipAction implements Action {
  readonly type = ActionTypes.GET_PAGE_SKIP;
}

export class GetPageSuccessAction implements Action {
  readonly type = ActionTypes.GET_PAGE_SUCCESS;
  constructor(public payload: { sitename: string; page: SitePage }) {}
}

// Save Page
export class SavePageRequestAction implements Action {
  readonly type = ActionTypes.SAVE_PAGE_REQUEST;
  constructor(public payload: { sitename: string; page: SitePage }) {}
}

export class SavePageFailureAction implements Action {
  readonly type = ActionTypes.SAVE_PAGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SavePageSuccessAction implements Action {
  readonly type = ActionTypes.SAVE_PAGE_SUCCESS;
  constructor(public payload: { result: Site }) {}
}

export type Actions =
  | GetSiteRequestAction
  | GetLiveSiteRequestAction
  | GetSiteSkipAction
  | GetSiteFailureAction
  | GetSiteSuccessAction
  | GetSitesRequestAction
  | GetSitesSkipAction
  | GetSitesFailureAction
  | GetSitesSuccessAction
  | SaveSiteRequestAction
  | SaveSiteFailureAction
  | SaveSiteSuccessAction
  | GetPageRequestAction
  | GetLivePageRequestAction
  | GetPageSkipAction
  | GetPageFailureAction
  | GetPageSuccessAction
  | SavePageRequestAction
  | SavePageFailureAction
  | SavePageSuccessAction;
