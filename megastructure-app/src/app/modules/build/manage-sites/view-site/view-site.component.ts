import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { getUserSites } from 'src/app/store/site-store/selectors';
import { RootStoreState } from 'src/app/store';
import {
  Site,
  SitePage,
  SiteElementTypes
} from 'src/app/core/models/site.model';
import { ViewSiteService } from './view-site.service';

@Component({
  selector: 'app-view-site',
  templateUrl: './view-site.component.html',
  styleUrls: ['./view-site.component.scss']
})
export class ViewSiteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  site = { pages: [] } as Site;
  currentPage = {
    pageRef: 1,
    title: 'page one',
    content: {
      elementRef: 1,
      type: SiteElementTypes.main,
      location: {},
      textContent: '',
      childElements: []
    }
  } as SitePage;

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private viewSiteService: ViewSiteService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(param => {
          this.currentPage.link = param.page;
          this.site.name = param.sitename;

          return this.store$.select(getUserSites);
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sites => this.initialise(sites)); // Can't use as method group
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initialise(sites: Site[]): void {
    if (this.site.name) {
      const siteFound = sites.find(
        site => site.name.toLowerCase() === this.site.name.toLowerCase()
      );

      this.site = { ...this.site, ...siteFound };
    }

    if (this.currentPage.link) {
      const pageFound = this.site.pages.find(
        page =>
          page.link &&
          page.link.toLowerCase() === this.currentPage.link.toLowerCase()
      );

      this.currentPage = { ...this.currentPage, ...pageFound };
    }

    this.viewSiteService.allElements.push(this.currentPage.content);
  }

  addElem(parentRef: number): void {
    this.viewSiteService.addElem(parentRef);
  }
}
