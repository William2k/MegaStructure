import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { getUserSites } from 'src/app/store/site-store/selectors';
import { RootStoreState } from 'src/app/store';
import { Site, SiteElement, SitePage } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-view-site',
  templateUrl: './view-site.component.html',
  styleUrls: ['./view-site.component.scss']
})
export class ViewSiteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  lastElemRef = 1;
  site = { pages: [] } as Site;
  currentPage = {
    pageRef: 1,
    title: 'page one',
    content: { elementRef: 1, textContent: '', childElements: [] }
  } as SitePage;
  allElements = [] as SiteElement[];

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
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
      .subscribe(sites => this.initialise(sites));
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

    this.allElements.push(this.currentPage.content);
  }

  addElem(parentRef: number): void {
    const newElem = {
      elementRef: this.lastElemRef + 1,
      type: null,
      textContent: '',
      location: { x: 0, y: 0 },
      childElements: []
    } as SiteElement;

    const parentElem = this.allElements.find(
      elem => elem.elementRef === parentRef
    );

    parentElem.childElements.push(newElem);
    this.allElements.push(newElem);
    this.lastElemRef = newElem.elementRef;
  }
}
