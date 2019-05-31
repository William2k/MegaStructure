import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, share } from 'rxjs/operators';

import * as siteActions from './actions';
import { SiteService } from 'src/app/core/services/site.service';

@Injectable()
export class SiteEffects {
  constructor(private actions: Actions, private siteService: SiteService) {}

  @Effect()
  SaveSiteRequestEffect$: Observable<Action> = this.actions.pipe(
    ofType<siteActions.SaveSiteRequestAction>(
      siteActions.ActionTypes.SAVE_SITE_REQUEST
    ),
    switchMap(action =>
      this.siteService.add(action.payload.form).pipe(
        map(result => new siteActions.SaveSiteSuccessAction({ result })),
        catchError(error =>
          observableOf(new siteActions.SaveSiteFailureAction({ error }))
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
    switchMap(action =>
      this.siteService.get().pipe(
        map(result => new siteActions.GetSitesSuccessAction({ result })),
        catchError(error =>
          observableOf(new siteActions.GetSitesFailureAction({ error }))
        )
      )
    ),
    share()
  );
}
