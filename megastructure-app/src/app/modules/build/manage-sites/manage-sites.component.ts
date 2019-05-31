import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { getUserSites } from 'src/app/store/site-store/selectors';
import { RootStoreState } from 'src/app/store';
import { SiteInfoComponent } from './site-info/site-info.component';
import { Site } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-manage-sites',
  templateUrl: './manage-sites.component.html',
  styleUrls: ['./manage-sites.component.scss']
})
export class ManageSitesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  sites: Site[] = [];

  constructor(
    private store$: Store<RootStoreState.State>,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store$
      .select(getUserSites)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sites => (this.sites = sites));

    this.route.params.subscribe(params => {
      if (
        params.sitename ||
        this.route.routeConfig.path.includes('manage-sites/add')
      ) {
        setTimeout(() => this.openSiteInfo(params.sitename as string), 0);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clickOpenSiteInfo(param: string): void {
    this.location.go(`${this.location.path()}/${param}`);

    param === 'add' ? this.openSiteInfo() : this.openSiteInfo(param);
  }

  private openSiteInfo(siteName: string = ''): void {
    const site =
      this.sites.find(s => s.name.toLowerCase() === siteName.toLowerCase()) ||
      ({} as Site);

    const dialogRef = this.dialog.open(SiteInfoComponent, {
      autoFocus: !site.name,
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
