import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';
import { ViewSiteService } from '../view-site.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-element',
  templateUrl: './site-element.component.html',
  styleUrls: ['./site-element.component.scss']
})
export class SiteElementComponent implements OnInit, OnDestroy {
  typeEnums = SiteElementTypes;

  private unsubscribe$ = new Subject<void>();
  @ViewChild('containerElem') elem: ElementRef;
  @Input() siteElement: SiteElement;
  typeEnumKeys: string[];

  constructor(
    private viewSiteService: ViewSiteService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const style = {
      main: {
        height: '100%',
        width: '100%'
      }
    };

    this.siteElement.styles = this.siteElement.styles || style;

    this.typeEnumKeys = Object.keys(this.typeEnums);

    this.viewSiteService.elemChangeDetection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((el: number) => {
        if (el === this.siteElement.elementRef) {
          this.cdRef.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  elemClick(e: Event): void {
    if (e.target !== this.elem.nativeElement) {
      return;
    }

    this.viewSiteService.toggleEditingElem(this.siteElement.elementRef);
  }

  elemTrackByFn(index: number, item: SiteElement): number {
    return item.elementRef;
  }
}
