import { Injectable } from '@angular/core';

import { ViewSiteServiceModule } from './view-site-service-module';
import { SiteElement } from 'src/app/core/models/site.model';

@Injectable({
  providedIn: ViewSiteServiceModule
})
export class ViewSiteService {
    lastElemRef = 1;
    allElements = [] as SiteElement[];

  constructor() {}

  addElem(parentRef: number): void {
    const newElem = {
      elementRef: this.lastElemRef + 1,
      type: null,
      textContent: '',
      location: { x: 0, y: 0 },
      childElements: []
    } as SiteElement;

    const parentElem = this.allElements.find(
      elem => elem.elementRef === parentRef
    );

    parentElem.childElements.push(newElem);
    this.allElements.push(newElem);
    this.lastElemRef = newElem.elementRef;
  }
}
