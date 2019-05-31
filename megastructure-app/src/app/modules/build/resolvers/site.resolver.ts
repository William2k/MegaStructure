import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, State, Action } from '@ngrx/store';
import { SiteStoreActions, SiteEffects } from 'src/app/store/site-store';
import { GetSitesRequestAction } from 'src/app/store/site-store/actions';
import { RootStoreState } from 'src/app/store';
import { getUserSites } from 'src/app/store/site-store/selectors';
import { takeUntil, map, take, skip } from 'rxjs/operators';
import { Site } from 'src/app/core/models/site.model';

@Injectable()
export class SiteResolver implements Resolve<any> {
  constructor(
    private store$: Store<RootStoreState.State>,
    private effects$: SiteEffects
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.store$.dispatch(new GetSitesRequestAction());

    return this.store$.select(getUserSites).pipe(
      skip(1),
      take(1)
    );
  }
}
