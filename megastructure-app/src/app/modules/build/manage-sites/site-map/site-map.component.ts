import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Site, SitePageTree, SitePage } from 'src/app/core/models/site.model';
import { pagesArrayToTree } from 'src/app/shared/helpers/site.helper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit {
  pagesTree: SitePageTree;
  lastPageRef: number;

  constructor(@Inject(MAT_DIALOG_DATA) public site: Site) {}

  ngOnInit(): void {
    this.setPageTree();

    const refs = this.site.pages.map(page => page.pageRef);
    this.lastPageRef = Math.max(...refs);
  }

  onAddPage(parentRef: number): void {
    console.log(parentRef);

    console.log(this.lastPageRef + 1);

    const newPage = {
      pageRef: this.lastPageRef + 1,
      parentRef,
      isActive: true,
      link: '',
      title: 'page'
    } as SitePage;

    this.lastPageRef++;

    this.site.pages.push(newPage);

    this.setPageTree();
  }

  setPageTree(): void {
    this.pagesTree = pagesArrayToTree(this.site.pages);
  }
}
