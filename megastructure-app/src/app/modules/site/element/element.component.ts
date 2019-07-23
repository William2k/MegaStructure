import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit, AfterViewInit, OnDestroy {
  typeEnums = SiteElementTypes;
  attributes = {};

  private unsubscribe$ = new Subject<void>();
  @ViewChild('containerElem') elem: ElementRef;
  @Input() element: SiteElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.element && this.attributes) {
      this.setAttributesObject();
    }
  }

  ngAfterViewInit(): void {
    this.setAttributes();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setAttributesObject(): void {
    for (const attr of this.element.attributes) {
      this.attributes[attr.name] = attr.value;
    }
  }

  setAttributes(): void {
    if (!this.elem) {
      return;
    }

    const elem = this.elem.nativeElement as HTMLElement;

    for (const attr of this.element.attributes) {
      this.renderer.setAttribute(elem, attr.name, attr.value);
    }
  }

  elemTrackByFn(index: number, item: SiteElement): number {
    return item.elementRef;
  }
}
