import { Injectable } from '@angular/core';

import { ViewSiteServiceModule } from './view-site-service-module';
import {
  SiteElement,
  SiteElementTypes,
  SitePage,
  Site
} from 'src/app/core/models/site.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: ViewSiteServiceModule
})
export class ViewSiteService {
  private lastElemRef = 1;
  private allElements = [] as SiteElement[];
  private currentPageSubject$ = new BehaviorSubject<SitePage>(null);

  public currentPage$: Observable<
    SitePage
  > = this.currentPageSubject$.asObservable();

  private site = { pages: [] } as Site;
  private currentPage = {
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

  constructor() {}

  initialise(sitename: string, link: string, sites: Site[]): void {
    if (sitename) {
      const siteFound = sites.find(
        site => site.name.toLowerCase() === sitename.toLowerCase()
      );

      this.site = { ...this.site, ...siteFound };
    }

    if (link) {
      const pageFound = this.site.pages.find(
        page =>
          page.link &&
          page.link.toLowerCase() === link.toLowerCase()
      );

      this.currentPage = { ...this.currentPage, ...pageFound };
    }

    this.allElements.push(this.currentPage.content);

    this.currentPageSubject$.next(this.currentPage);
  }

  updatePage(newPageData: SitePage): void {
    const newPage = { ...this.currentPage, ...newPageData } as SitePage;

    this.currentPageSubject$.next(newPage);
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
    this.currentPageSubject$.next(this.currentPage);
    this.lastElemRef = newElem.elementRef;
  }
}
