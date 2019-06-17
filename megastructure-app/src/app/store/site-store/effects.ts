import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  concatMap,
  share,
  withLatestFrom
} from 'rxjs/operators';
import * as moment from 'moment';

import * as siteActions from './actions';
import { SiteService } from 'src/app/core/services/site.service';
import { RootStoreState } from '..';

@Injectable()
export class SiteEffects {
  constructor(
    private store$: Store<RootStoreState.State>,
    private actions: Actions,
    private siteService: SiteService
  ) {}

  @Effect()
  SaveSiteRequestEffect$: Observable<Action> = this.actions.pipe(
    ofType<siteActions.SaveSiteRequestAction>(
      siteActions.ActionTypes.SAVE_SITE_REQUEST
    ),
    concatMap(action =>
      this.siteService.add(action.payload.site).pipe(
        map(result => new siteActions.SaveSiteSuccessAction({ result })),
        catchError(error =>
          of(new siteActions.SaveSiteFailureAction({ error }))
        )
      )
    ),
    share()
  );

  @Effect()
  SavePageRequestEffect$: Observable<Action> = this.actions.pipe(
    ofType<siteActions.SavePageRequestAction>(
      siteActions.ActionTypes.SAVE_PAGE_REQUEST
    ),
    concatMap(action =>
      this.siteService.addPage(action.payload.sitename, action.payload.page).pipe(
        map(result => new siteActions.SavePageSuccessAction({ result })),
        catchError(error =>
          of(new siteActions.SavePageFailureAction({ error }))
        )
      )
    ),
    share()
  );

  @Effect()
  GetSitesRequestEffect$: Observable<Action> = this.actions.pipe(
    ofType<siteActions.GetSitesRequestAction>(
      siteActions.ActionTypes.GET_SITES_REQUEST
    ),
    withLatestFrom(this.store$),
    concatMap(([action, state]) => {
      const recentlyFetched = moment()
        .subtract(5, 'minute')
        .isBefore(state.site.lastFetch);

      const source = recentlyFetched
        ? of(state.site.sites)
        : this.siteService.get();

      return source.pipe(
        map(result => {
          return recentlyFetched
            ? new siteActions.GetSitesSkipAction()
            : new siteActions.GetSitesSuccessAction({ result });
        }),
        catchError(error =>
          of(new siteActions.GetSitesFailureAction({ error }))
        )
      );
    }),
    share()
  );
}
