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
import { takeUntil } from 'rxjs/operators';

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

  constructor(private viewSiteService: ViewSiteService) {}

  ngOnInit(): void {
    this.showEditOptions$ = this.viewSiteService.showEditOptions$;
    this.siteElement$ = this.viewSiteService.editingElem$;

    this.siteElement$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(site => this.resetFields());

    this.showEditOptions$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => show && this.resetFields());
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

  savePage(): void {
    this.viewSiteService.saveSite();
  }

  indexTrackByFn(index: number): number {
    return index;
  }
}
