import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ViewSiteService } from '../view-site.service';
import {
  SiteElement,
  SiteElementTypes,
  CssStyle,
  ElementAttribute
} from 'src/app/core/models/site.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  typeEnums = SiteElementTypes;
  newStyle = {} as CssStyle;
  newAttr = {} as ElementAttribute;

  siteElement$: Observable<SiteElement>;
  showEditOptions$: Observable<boolean>;

  constructor(
    private viewSiteService: ViewSiteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showEditOptions$ = this.viewSiteService.showEditOptions$;
    this.siteElement$ = this.viewSiteService.editingElem$;

    this.siteElement$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(site => this.resetFields());

    this.showEditOptions$.pipe(takeUntil(this.unsubscribe$)).subscribe(show => {
      if (show) {
        this.resetFields();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  resetFields(): void {
    this.newAttr = {} as ElementAttribute;
    this.newStyle = {} as CssStyle;
  }

  addElemClick(parentRef: number): void {
    this.viewSiteService.addElem(parentRef);
  }

  editClick(): void {
    this.viewSiteService.toggleEditingOptions();
  }

  addAttribute(elemRef: number): void {
    if (!this.newAttr.name || !this.newAttr.value) {
      return;
    }

    this.viewSiteService.addAttribute(elemRef, this.newAttr);

    this.newAttr = {} as ElementAttribute;
  }

  addStyle(elemRef: number): void {
    if (!this.newStyle.name || !this.newStyle.value) {
      return;
    }

    this.viewSiteService.addStyle(elemRef, this.newStyle);

    this.newStyle = {} as CssStyle;
  }

  updateAttributes(elemRef: number) {
    this.viewSiteService.updateElementAttributes(elemRef);
  }

  updateComponent(): void {
    this.viewSiteService.updateCurrentElem();
  }

  removeElem(elemRef: number): void {
    const success = this.viewSiteService.toggleElemActive(elemRef, false);

    this.snackBar
      .open(
        `Removing element ${elemRef} ${success ? 'successful' : 'failed'}`,
        success ? 'Undo' : 'close',
        {
          duration: 2000
        }
      )
      .onAction()
      .pipe(take(1))
      .subscribe(() => {
        if (success) {
          this.viewSiteService.toggleElemActive(elemRef);
        }
      });
  }

  savePage(): void {
    this.viewSiteService.saveSite();
  }

  indexTrackByFn(index: number): number {
    return index;
  }
}
