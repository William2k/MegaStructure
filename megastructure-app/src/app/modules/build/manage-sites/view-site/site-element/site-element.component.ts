import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';
import jss from 'jss';
import { Observable } from 'rxjs';

import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';
import { ViewSiteService } from '../view-site.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-element',
  templateUrl: './site-element.component.html',
  styleUrls: ['./site-element.component.scss']
})
export class SiteElementComponent implements OnInit {
  typeEnums = SiteElementTypes;
  editingElem$: Observable<number>;
  showEditOptions$: Observable<boolean>;

  @ViewChild('elem') elem: ElementRef;
  @Input() siteElement: SiteElement;
  classes: Record<never, string>;
  typeEnumKeys: string[];

  constructor(private viewSiteService: ViewSiteService) {}

  ngOnInit(): void {
    this.editingElem$ = this.viewSiteService.editingElemRef$;
    this.showEditOptions$ = this.viewSiteService.showEditOptions$;

    const style = {
      main: {
        height:
          this.siteElement.type === SiteElementTypes.main ? '100%' : '50%',
        width: this.siteElement.type === SiteElementTypes.main ? '100%' : '50%'
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

  elemClick(e: Event): void {
    if (e.target !== this.elem.nativeElement) {
      return;
    }

    this.viewSiteService.toggleEditingElem(this.siteElement.elementRef);
  }

  editClick(): void {
    this.viewSiteService.toggleEditingOptions();
  }
}
