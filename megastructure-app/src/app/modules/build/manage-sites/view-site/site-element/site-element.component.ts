import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { SiteElement } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-site-element',
  templateUrl: './site-element.component.html',
  styleUrls: ['./site-element.component.scss']
})
export class SiteElementComponent implements OnInit, OnDestroy {
  @Input() siteElement: SiteElement;
  @Output() addElem = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  addElemClick(parentRef: number): void {
    this.addElem.emit(parentRef);
  }
}
