import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { RootStoreState } from 'src/app/store';
import {
  GetLiveSiteRequestAction,
  GetLivePageRequestAction
} from 'src/app/store/site-store/actions';
import { SitePage, Site } from 'src/app/core/models/site.model';
import { getSiteState } from 'src/app/store/site-store/selectors';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private previousTitle: string;
  currentPage: SitePage;

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    let sitename: string;
    let pageLink: string;

    this.route.params
      .pipe(
        switchMap(params => {
          sitename = params.sitename || '';
          pageLink = params.page || '';

          this.store$.dispatch(new GetLiveSiteRequestAction({ sitename }));

          return this.store$.select(getSiteState);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(siteState => {
        if (siteState.fetchingSites || siteState.fetchingPage) {
          return;
        }

        const currentSite = siteState.sites.find(
          site => site.name.toLowerCase() === sitename.toLowerCase()
        );

        this.intialise(currentSite, pageLink);
      });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.previousTitle);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  intialise(currentSite: Site, pageLink: string): void {
    if (!currentSite) {
      this.router.navigate(['site', 'not-found']);
      return;
    }

    const currentPage = currentSite.pages.find(
      page => page.link.toLowerCase() === pageLink.toLowerCase()
    );

    this.currentPage = currentPage;

    this.previousTitle = this.titleService.getTitle();

    this.titleService.setTitle(this.currentPage.title);

    if (!currentPage.content) {
      this.store$.dispatch(
        new GetLivePageRequestAction({
          sitename: currentSite.name,
          pageRef: currentPage.pageRef
        })
      );
    }
  }
}
