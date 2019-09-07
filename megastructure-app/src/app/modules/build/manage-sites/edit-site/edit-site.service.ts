import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RootStoreState } from 'src/app/store';
import { Store } from '@ngrx/store';

import { EditSiteServiceModule } from './edit-site-service-module';
import {
  SiteElement,
  SiteElementTypes,
  SitePage,
  Site,
  ElementAttribute,
  CssStyle
} from 'src/app/core/models/site.model';
import {
  SavePageRequestAction,
  SaveSiteRequestAction,
  GetPageRequestAction
} from 'src/app/store/site-store/actions';

@Injectable({
  providedIn: EditSiteServiceModule
})
export class EditSiteService {
  private baseSite = {
    pages: [
      {
        pageRef: 1,
        title: 'base',
        link: '',
        parentRef: 0,
        content: {
          elementRef: 1,
          type: SiteElementTypes.main,
          attributes: [],
          textContent: '',
          location: {},
          childElements: [],
          changes: { amount: 0 },
          isActive: true
        },
        isActive: true,
        APIs: [],
      }
    ]
  } as Site;
  private lastElemRef = 1;
  private allElements = [] as SiteElement[];
  private currentPageSubject$ = new BehaviorSubject<SitePage>(null);
  private editingElemSubject$ = new BehaviorSubject<SiteElement>(null);
  private showEditOptionsSubject$ = new BehaviorSubject<boolean>(false);
  private elemChangeDetectionSubject$ = new Subject<number>();
  private updateAttributesSubject$ = new Subject<number>();
  private site = this.baseSite;
  private currentPage = this.site.pages[0];

  public editingElem$ = this.editingElemSubject$.asObservable();
  public currentPage$ = this.currentPageSubject$.asObservable();
  public showEditOptions$ = this.showEditOptionsSubject$.asObservable();
  public elemChangeDetection$ = this.elemChangeDetectionSubject$.asObservable();
  public updateAttributes$ = this.updateAttributesSubject$.asObservable();

  constructor(private store$: Store<RootStoreState.State>) {}

  initialise(sitename: string, pageLink: string = '', sites: Site[]): boolean {
    this.resetSite();

    const siteFound = sites.find(
      site => site.name.toLowerCase() === sitename.toLowerCase()
    );

    if (!siteFound) {
      return false;
    }

    this.site = { ...this.site, ...siteFound };

    const pageFound = this.site.pages.find(
      page => page.link.toLowerCase() === pageLink.toLowerCase()
    );

    if (!pageFound && pageLink) {
      return false;
    }

    if (pageFound && !pageFound.content) {
      this.store$.dispatch(
        new GetPageRequestAction({
          sitename: this.site.name,
          pageRef: pageFound.pageRef
        })
      );

      return true;
    }

    if (!pageLink && !pageFound) {
      this.site.pages.push(this.currentPage);
    } else {
      this.currentPage = { ...this.currentPage, ...pageFound };
    }

    this.currentPageSubject$.next(this.currentPage);

    this.setAllElements(this.currentPage.content);

    return true;
  }

  resetSite(): void {
    this.site = this.baseSite;
    this.currentPage = this.site.pages[0];
    this.lastElemRef = 0;
    this.allElements = [];
    this.currentPageSubject$.next(null);
    this.editingElemSubject$.next(null);
    this.showEditOptionsSubject$.next(false);
  }

  setAllElements(parentElem: SiteElement): void {
    this.allElements.push(parentElem);

    this.lastElemRef = Math.max(this.lastElemRef, parentElem.elementRef);

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

  elementCleanup(): void {
    for (const elem of this.allElements.filter(el => el.isActive)) {
      elem.attributes = elem.attributes.filter(attr => attr.name);
      elem.changes.amount = 0;
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

    currentElem.changes.amount += 1; // Used to trigger jss

    this.elemChangeDetectionSubject$.next(currentElem.elementRef);
  }

  updateElementAttributes(elemRef: number): void {
    this.updateAttributesSubject$.next(elemRef);
  }

  addAttribute(elemRef: number, attr: ElementAttribute): void {
    const element = this.allElements.find(elem => elem.elementRef === elemRef);

    element.attributes.push(attr);

    element.attributes = element.attributes.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    this.updateCurrentElem();
    this.updateElementAttributes(elemRef);
  }

  addStyle(elemRef: number, newStyle: CssStyle): void {
    const element = this.allElements.find(elem => elem.elementRef === elemRef);

    element.styles.main[newStyle.name] = newStyle.value;

    this.updateCurrentElem();
  }

  addElem(parentRef: number): void {
    const newElem = {
      elementRef: this.lastElemRef + 1,
      type: null,
      textContent: '',
      location: { x: 0, y: 0 },
      childElements: [],
      changes: { amount: 0 },
      attributes: [],
      styles: {
        main: {
          float: 'left',
          height: '50%',
          width: '50%'
        }
      },
      isActive: true
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

  toggleElemActive(elemRef: number, state: boolean = null): boolean {
    if (elemRef === 1) {
      // can't remove main parent element
      return false;
    }

    const elem = this.allElements.find(el => el.elementRef === elemRef);

    elem.isActive = state === null ? !elem.isActive : state;

    this.updateCurrentElem();

    return true;
  }

  elementsRemoved(): number[] {
    return this.allElements.reduce(
      (filtered, elem) =>
        !elem.isActive ? filtered.concat(elem.elementRef) : filtered,
      [] as number[]
    );
  }

  saveSite(cleanUp: boolean = true): void {
    if (cleanUp) {
      this.elementCleanup();
    }

    this.store$.dispatch(new SaveSiteRequestAction({ site: this.site }));
  }

  savePage(cleanUp: boolean = true): void {
    if (cleanUp) {
      this.elementCleanup();
    }

    this.store$.dispatch(
      new SavePageRequestAction({
        sitename: this.site.name,
        page: this.currentPage
      })
    );
  }
}
