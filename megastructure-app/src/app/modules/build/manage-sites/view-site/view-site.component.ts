import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { getUserSites } from 'src/app/store/site-store/selectors';
import { RootStoreState } from 'src/app/store';
import { Site } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-view-site',
  templateUrl: './view-site.component.html',
  styleUrls: ['./view-site.component.scss']
})
export class ViewSiteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  site = {} as Site;

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(param => {
          this.site.name = param.sitename;
          return this.store$.select(getUserSites);
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        sites =>
          (this.site = sites.find(s => {
            if (this.site.name) {
              return s.name.toLowerCase() === this.site.name.toLowerCase();
            }
          }))
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
