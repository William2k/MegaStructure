import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SiteInfoComponent } from './Site/site-info.component';
import { Site } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-manage-sites',
  templateUrl: './manage-sites.component.html',
  styleUrls: ['./manage-sites.component.scss']
})
export class ManageSitesComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(site: Site = {} as Site) {
    const dialogRef = this.dialog.open(SiteInfoComponent, {
      width: '90%',
      data: { name: site.name }
    });

    dialogRef.componentInstance.siteId = site.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
