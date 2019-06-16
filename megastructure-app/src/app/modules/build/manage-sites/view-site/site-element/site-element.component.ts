import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild
} from '@angular/core';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';
import { ViewSiteService } from '../view-site.service';

@Component({
  selector: 'app-site-element',
  templateUrl: './site-element.component.html',
  styleUrls: ['./site-element.component.scss']
})
export class SiteElementComponent implements OnInit {
  typeEnums = SiteElementTypes;
  classes: object;

  @ViewChild('containerElem') elem: ElementRef;
  @Input() siteElement: SiteElement;
  @Input() changesAmount: number;
  typeEnumKeys: string[];

  constructor(private viewSiteService: ViewSiteService) {}

  ngOnInit(): void {
    const style = {
      main: {
        height: '100%',
        width: '100%'
      }
    };

    this.siteElement.styles = this.siteElement.styles || style;

    this.typeEnumKeys = Object.keys(this.typeEnums);
  }

  elemClick(e: Event): void {
    if (e.target !== this.elem.nativeElement) {
      return;
    }

    this.viewSiteService.toggleEditingElem(this.siteElement.elementRef);
  }
}
