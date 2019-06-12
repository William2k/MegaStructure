import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import jss from 'jss';
import { CdkDrag } from '@angular/cdk/drag-drop';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';
import { ViewSiteService } from '../view-site.service';
import { positionOffset } from 'src/app/shared/helpers/dom.helper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-element',
  templateUrl: './site-element.component.html',
  styleUrls: ['./site-element.component.scss']
})
export class SiteElementComponent implements OnInit {
  typeEnums = SiteElementTypes;
  openEdit = false;
  gridRows: number[];
  gridColumns: number[];

  @Input() siteElement: SiteElement;
  classes: Record<never, string>;
  typeEnumKeys: string[];

  constructor(private viewSiteService: ViewSiteService) {}

  ngOnInit(): void {
    const style = {
      main: {
        height:
          this.siteElement.type === SiteElementTypes.main ? '100%' : '150px',
        width:
          this.siteElement.type === SiteElementTypes.main ? '100%' : '150px'
      }
    };

    this.siteElement.styles = this.siteElement.styles || style;

    this.updateCss();

    this.typeEnumKeys = Object.keys(this.typeEnums);

    this.gridRows = [...Array(12).keys()].map(v => v + 1);

    this.gridColumns = [...Array(12).keys()].map(v => v + 1);
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

  dropElem(e: any): void {
    const drag = e.source as CdkDrag;

    const elem = drag.element.nativeElement as HTMLDivElement;

    console.log(positionOffset(elem));
  }
}
