import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Site, SitePageTree } from 'src/app/core/models/site.model';
import { pagesArrayToTree } from 'src/app/shared/helpers/site.helper';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit {
  pagesTree: SitePageTree;

  constructor(@Inject(MAT_DIALOG_DATA) public site: Site) {}

  ngOnInit(): void {
    this.pagesTree = pagesArrayToTree(this.site.pages);
  }
}
