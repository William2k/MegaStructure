import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ViewSiteService } from '../view-site.service';
import { SiteElement, SiteElementTypes } from 'src/app/core/models/site.model';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {
  typeEnums = SiteElementTypes;
  typeEnumKeys: string[];

  siteElement$: Observable<SiteElement>;
  showEditOptions$: Observable<boolean>;

  constructor(private viewSiteService: ViewSiteService) {}

  ngOnInit(): void {
    this.typeEnumKeys = Object.keys(this.typeEnums);
    this.showEditOptions$ = this.viewSiteService.showEditOptions$;
    this.siteElement$ = this.viewSiteService.editingElem$;
  }

  addElemClick(parentRef: number): void {
    this.viewSiteService.addElem(parentRef);
  }

  editClick(): void {
    this.viewSiteService.toggleEditingOptions();
  }

  updateComponent(): void {
    this.viewSiteService.updateCurrentElem();
  }
}
