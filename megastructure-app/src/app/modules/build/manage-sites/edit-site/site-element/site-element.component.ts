import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';
import { EditSiteService } from '../edit-site.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-element',
  templateUrl: './site-element.component.html',
  styleUrls: ['./site-element.component.scss']
})
export class SiteElementComponent implements OnInit, AfterViewInit, OnDestroy {
  typeEnums = SiteElementTypes;
  attributes = {};

  private unsubscribe$ = new Subject<void>();
  @ViewChild('containerElem') elem: ElementRef;
  @Input() siteElement: SiteElement;

  constructor(
    private renderer: Renderer2,
    private editSiteService: EditSiteService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const style = {
      main: {
        float: 'left',
        height: '100%',
        width: '100%'
      }
    };

    this.siteElement.styles = this.siteElement.styles || style;


    this.editSiteService.elemChangeDetection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((el: number) => {
        if (el === this.siteElement.elementRef) {
          this.cdRef.markForCheck();
        }
      });

    this.editSiteService.updateAttributes$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(el => {
        if (el === this.siteElement.elementRef) {
          this.setAttributes();
        }
      });

    this.setAttributesObject();
  }

  ngAfterViewInit(): void {
    this.setAttributes();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setAttributesObject(): void {
    for (const attr of this.siteElement.attributes) {
      this.attributes[attr.name] = attr.value;
    }
  }

  setAttributes(): void {
    if (!this.elem) {
      return;
    }

    const elem = this.elem.nativeElement as HTMLElement;

    for (const attr of this.siteElement.attributes) {
      this.renderer.setAttribute(elem, attr.name, attr.value);
    }
  }

  elemClick(e: Event): void {
    if (e.target !== this.elem.nativeElement) {
      return;
    }

    this.editSiteService.toggleEditingElem(this.siteElement.elementRef);
  }

  elemTrackByFn(index: number, item: SiteElement): number {
    return item.elementRef;
  }
}
