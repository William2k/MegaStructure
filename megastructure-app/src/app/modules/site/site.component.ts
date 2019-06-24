import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RootStoreState } from 'src/app/store';
import { GetSiteRequestAction } from 'src/app/store/site-store/actions';
import { SitePage } from 'src/app/core/models/site.model';
import { getSiteState } from 'src/app/store/site-store/selectors';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  currentPage$: Subject<SitePage>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let sitename: string;
    let page: string;

    this.route.params
      .pipe(
        switchMap(params => {
          sitename = params.sitename || '';
          page = params.page || '';

          this.store$.dispatch(new GetSiteRequestAction({ sitename }));

          return this.store$.select(getSiteState);
        })
      )
      .subscribe(siteState => console.log(sitename));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
