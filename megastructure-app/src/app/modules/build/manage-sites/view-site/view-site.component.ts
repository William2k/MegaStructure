import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { getUserSites } from 'src/app/store/site-store/selectors';
import { RootStoreState } from 'src/app/store';
import { SitePage } from 'src/app/core/models/site.model';
import { ViewSiteService } from './view-site.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-view-site',
  templateUrl: './view-site.component.html',
  styleUrls: ['./view-site.component.scss']
})
export class ViewSiteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  currentPage$: Observable<SitePage>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private viewSiteService: ViewSiteService
  ) {}

  ngOnInit(): void {
    let link: string;
    let sitename: string;

    this.currentPage$ = this.viewSiteService.currentPage$;

    this.route.params
      .pipe(
        switchMap(param => {
          link = param.page;
          sitename = param.sitename;

          return this.store$.select(getUserSites);
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sites => this.viewSiteService.initialise(sitename, link, sites)); // Can't use as method group
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addElem(parentRef: number): void {
    this.viewSiteService.addElem(parentRef);
  }
}
