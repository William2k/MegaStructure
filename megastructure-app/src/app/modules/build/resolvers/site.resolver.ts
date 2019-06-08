import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, filter } from 'rxjs/operators';

import { GetSitesRequestAction } from 'src/app/store/site-store/actions';
import { RootStoreState } from 'src/app/store';
import { getSiteState } from 'src/app/store/site-store/selectors';
import { State } from 'src/app/store/site-store/state';

@Injectable()
export class SiteResolver implements Resolve<State> {
  constructor(private store$: Store<RootStoreState.State>) {}

  resolve(): Observable<State> {
    this.store$.dispatch(new GetSitesRequestAction());

    return this.store$.select(getSiteState).pipe(
      filter(state => !!state.lastFetch),
      take(1)
    );
  }
}
