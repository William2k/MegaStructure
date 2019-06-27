import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { EditSiteService } from '../edit-site.service';
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
    private editSiteService: EditSiteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showEditOptions$ = this.editSiteService.showEditOptions$;
    this.siteElement$ = this.editSiteService.editingElem$;

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
    this.editSiteService.addElem(parentRef);
  }

  editClick(): void {
    this.editSiteService.toggleEditingOptions();
  }

  addAttribute(elemRef: number): void {
    if (!this.newAttr.name || !this.newAttr.value) {
      return;
    }

    this.editSiteService.addAttribute(elemRef, this.newAttr);

    this.newAttr = {} as ElementAttribute;
  }

  addStyle(elemRef: number): void {
    if (!this.newStyle.name || !this.newStyle.value) {
      return;
    }

    this.editSiteService.addStyle(elemRef, this.newStyle);

    this.newStyle = {} as CssStyle;
  }

  updateAttributes(elemRef: number) {
    this.editSiteService.updateElementAttributes(elemRef);
  }

  updateComponent(): void {
    this.editSiteService.updateCurrentElem();
  }

  removeElem(elemRef: number): void {
    const success = this.editSiteService.toggleElemActive(elemRef, false);

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
          this.editSiteService.toggleElemActive(elemRef);
        }
      });
  }

  savePage(): void {
    this.editSiteService.saveSite();
  }

  indexTrackByFn(index: number): number {
    return index;
  }
}
