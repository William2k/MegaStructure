import { Injectable, EventEmitter } from '@angular/core';

import { ViewSiteServiceModule } from './view-site-service-module';
import {
  SiteElement,
  SiteElementTypes,
  SitePage,
  Site
} from 'src/app/core/models/site.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: ViewSiteServiceModule
})
export class ViewSiteService {
  private lastElemRef = 1;
  private allElements = [] as SiteElement[];
  private currentPageSubject$ = new BehaviorSubject<SitePage>(null);
  private editingElemSubject$ = new BehaviorSubject<SiteElement>(null);
  private showEditOptionsSubject$ = new BehaviorSubject<boolean>(false);
  private elemChangeDetectionSubject$ = new Subject<number>();
  private site = { pages: [] } as Site;
  private currentPage = {
    pageRef: 1,
    title: 'page one',
    content: {
      elementRef: 1,
      type: SiteElementTypes.main,
      location: {},
      textContent: '',
      childElements: [],
      changes: { amount: 0 }
    }
  } as SitePage;

  public editingElem$ = this.editingElemSubject$.asObservable();
  public currentPage$ = this.currentPageSubject$.asObservable();
  public showEditOptions$ = this.showEditOptionsSubject$.asObservable();
  public elemChangeDetection$ = this.elemChangeDetectionSubject$.asObservable();

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
        page => page.link && page.link.toLowerCase() === link.toLowerCase()
      );

      this.currentPage = { ...this.currentPage, ...pageFound };
    }

    this.allElements.push(this.currentPage.content);

    this.currentPageSubject$.next(this.currentPage);
  }

  toggleEditingOptions(): void {
    const current = this.showEditOptionsSubject$.getValue();

    this.showEditOptionsSubject$.next(!current);
  }

  toggleEditingElem(ref: number): void {
    const currenteditingElemValue = this.editingElemSubject$.getValue();

    if (currenteditingElemValue && ref === currenteditingElemValue.elementRef) {
      this.editingElemSubject$.next(null);
    } else {
      const elem = this.allElements.find(el => el.elementRef === ref);

      this.editingElemSubject$.next(elem);
    }
  }

  updatePage(newPageData: SitePage = null): void {
    const newPage = { ...this.currentPage, ...newPageData } as SitePage;

    this.currentPageSubject$.next(newPage);
  }

  updateCurrentElem(): void {
    const currentElem = this.editingElemSubject$.getValue();

    currentElem.changes.amount += 1; // Needed to trigger change detection, as change detection does not work with objects except async

    this.elemChangeDetectionSubject$.next(currentElem.elementRef);
  }

  addElem(parentRef: number): void {
    const newElem = {
      elementRef: this.lastElemRef + 1,
      type: null,
      textContent: '',
      location: { x: 0, y: 0 },
      childElements: [],
      changes: { amount: 0 },
      styles: {
        main: {
          height: '50%',
          width: '50%'
        }
      }
    } as SiteElement;

    const parentElem = this.allElements.find(
      elem => elem.elementRef === parentRef
    );

    parentElem.childElements.push(newElem);
    this.allElements.push(newElem);
    this.updatePage();
    this.updateCurrentElem();
    this.lastElemRef = newElem.elementRef;
  }
}
