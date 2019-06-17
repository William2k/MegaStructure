import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RootStoreState } from 'src/app/store';
import { Store } from '@ngrx/store';

import { ViewSiteServiceModule } from './view-site-service-module';
import {
  SiteElement,
  SiteElementTypes,
  SitePage,
  Site
} from 'src/app/core/models/site.model';
import {
  SavePageRequestAction,
  SaveSiteRequestAction
} from 'src/app/store/site-store/actions';

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
  private baseSite = {
    pages: [
      {
        pageRef: 1,
        title: 'page one',
        link: '',
        content: {
          elementRef: 1,
          type: SiteElementTypes.main,
          textContent: '',
          location: {},
          childElements: [],
          changes: { amount: 0 }
        }
      } as SitePage
    ]
  } as Site;
  private site = this.baseSite;
  private currentPage = this.site.pages[0];

  public editingElem$ = this.editingElemSubject$.asObservable();
  public currentPage$ = this.currentPageSubject$.asObservable();
  public showEditOptions$ = this.showEditOptionsSubject$.asObservable();
  public elemChangeDetection$ = this.elemChangeDetectionSubject$.asObservable();

  constructor(private store$: Store<RootStoreState.State>) {}

  initialise(sitename: string, link: string = '', sites: Site[]): void {
    if (this.site.name && sitename.toLowerCase() !== this.site.name.toLowerCase()) {
      this.resetSite();
    }

    if (sitename) {
      const siteFound = sites.find(
        site => site.name.toLowerCase() === sitename.toLowerCase()
      );

      this.site = { ...this.site, ...siteFound };
    }

    const pageFound = this.site.pages.find(
      page => page.link.toLowerCase() === link.toLowerCase()
    );

    this.currentPage = { ...this.currentPage, ...pageFound };

    this.currentPageSubject$.next(this.currentPage);

    this.setAllElements(this.currentPage.content);
  }

  resetSite(): void {
    this.site = this.baseSite;
    this.currentPage = this.site.pages[0];
  }

  setAllElements(parentElem: SiteElement): void {
    this.allElements.push(parentElem);

    if (!parentElem.childElements) {
      return;
    }

    for (const elem of parentElem.childElements) {
      this.setAllElements(elem);
    }
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

    this.site.pages = [
      ...this.site.pages.filter(page => page.pageRef !== newPage.pageRef),
      newPage
    ];
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

  saveSite(): void {
    this.store$.dispatch(new SaveSiteRequestAction({ site: this.site }));
  }

  savePage(): void {
    this.store$.dispatch(
      new SavePageRequestAction({
        sitename: this.site.name,
        page: this.currentPage
      })
    );
  }
}
