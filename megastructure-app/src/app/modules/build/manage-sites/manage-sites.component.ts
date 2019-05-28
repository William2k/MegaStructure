import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SiteInfoComponent } from './Site/site-info.component';
import { Site } from 'src/app/core/models/site.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-sites',
  templateUrl: './manage-sites.component.html',
  styleUrls: ['./manage-sites.component.scss']
})
export class ManageSitesComponent {
  sites: Site[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    route.params.subscribe(params => {
      if (params.id || route.routeConfig.path.includes('manage-sites/add')) {
        this.openSiteInfo(params.id);
      }
    });
  }

  clickOpenSiteInfo(param: string): void {
    this.location.go(`${this.location.path()}/${param}`);

    this.openSiteInfo(param !== 'add' ? param : null);
  }

  openSiteInfo(siteId: string = ''): void {
    const site = this.sites.find(s => s.id === siteId) || ({} as Site);

    const dialogRef = this.dialog.open(SiteInfoComponent, {
      autoFocus: !site.id,
      width: '90%',
      position: { top: '20px' },
      data: site
    });

    dialogRef.afterClosed().subscribe(result => {
      this.location.go('build/manage-sites');

      console.log(`Dialog result: ${result}`);
    });
  }
}
