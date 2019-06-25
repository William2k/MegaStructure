import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { Subject } from 'rxjs';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit, OnDestroy {
  typeEnums = SiteElementTypes;

  private unsubscribe$ = new Subject<void>();
  @ViewChild('containerElem') elem: ElementRef;
  @Input() element: SiteElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => this.setAttributes(), 0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
