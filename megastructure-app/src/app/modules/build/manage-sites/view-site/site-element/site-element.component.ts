import { Component, OnInit, Input } from '@angular/core';
import jss from 'jss';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';
import { ViewSiteService } from '../view-site.service';

@Component({
  selector: 'app-site-element',
  templateUrl: './site-element.component.html',
  styleUrls: ['./site-element.component.scss']
})
export class SiteElementComponent implements OnInit {
  typeEnums = SiteElementTypes;
  openEdit = false;

  @Input() siteElement: SiteElement;
  classes: Record<never, string>;
  typeEnumKeys: string[];

  constructor(private viewSiteService: ViewSiteService) {}

  ngOnInit(): void {
    const style = {
      main: {
        height: '100px',
        width: '100px'
      }
    };

    this.siteElement.styles = this.siteElement.styles || style;

    this.updateCss();

    this.typeEnumKeys = Object.keys(this.typeEnums);
  }

  updateCss(): void {
    const sheet = jss
      .createStyleSheet(this.siteElement.styles, { link: true })
      .attach();

    this.classes = sheet.classes;
  }

  addElemClick(parentRef: number): void {
    this.viewSiteService.addElem(parentRef);
  }

  editClick(): void {
    this.openEdit = !this.openEdit;
  }
}
