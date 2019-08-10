import {
  Component,
  OnInit,
  Inject,
  OnDestroy
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Site, SitePageTree, SitePage } from 'src/app/core/models/site.model';
import { pagesArrayToTree } from 'src/app/shared/helpers/site.helper';
import { RootStoreState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { getSiteState } from 'src/app/store/site-store/selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private lastPageRef = 0;
  site: Site;
  saving: boolean;
  pagesTree: SitePageTree;
  editingPage: SitePage;
  updatedPages: number[] = [];

  constructor(
    private store$: Store<RootStoreState.State>,
    @Inject(MAT_DIALOG_DATA) public passedSite: Site
  ) {}

  ngOnInit(): void {
    this.store$
      .select(getSiteState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(siteState => {
        this.saving = siteState.savingSite;

        this.site = siteState.sites.find(
          s => s.name.toLowerCase() === this.passedSite.name.toLowerCase()
        );

        this.setPageTree();

        const refs = this.site.pages.map(page => page.pageRef);
        this.lastPageRef = Math.max(...refs, this.lastPageRef);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAddPage(parentRef: number = 0): void {
    const styles = {
      main: {
        float: 'left',
        height: '100%',
        width: '100%'
      }
    };

    const newPage = {
      pageRef: this.lastPageRef + 1,
      parentRef,
      isActive: true,
      link: '',
      content: {
        elementRef: 1,
        type: 'main',
        styles,
        attributes: [],
        textContent: '',
        childElements: [],
        isActive: true,
        changes: { amount: 0 }
      },
      APIs: [],
      title: 'page'
    } as SitePage;

    this.lastPageRef++;

    this.site.pages.push(newPage);

    this.setPageTree();

    this.updatedPages.push(newPage.pageRef);

    this.editingPage = newPage;
  }

  onEditPage(pageRef: number): void {
    this.editingPage = this.site.pages.find(page => page.pageRef === pageRef);
  }

  onCloseEditPage(): void {
    this.editingPage = null;
  }

  setPageTree(): void {
    this.pagesTree = pagesArrayToTree(this.site.pages);
  }
}
