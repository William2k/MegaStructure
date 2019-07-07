import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { getUserSites } from 'src/app/store/site-store/selectors';
import { RootStoreState } from 'src/app/store';
import { SiteInfoComponent } from './site-info/site-info.component';
import { Site } from 'src/app/core/models/site.model';
import { SiteMapComponent } from './site-map/site-map.component';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store$
      .select(getUserSites)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sites => (this.sites = sites));

    this.route.params.subscribe(params => {
      if (
        this.route.routeConfig.path.includes(
          `manage-sites/:sitename/map`
        )
      ) {
        setTimeout(() => this.openSiteMap(params.sitename as string), 0);
      } else if (
        params.sitename ||
        this.route.routeConfig.path.includes('manage-sites/add')
      ) {
        setTimeout(() => this.openSiteInfo(params.sitename as string), 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clickOpenSiteInfo(param: string): void {
    this.location.go(`${this.location.path()}/${param}`);

    param === 'add' ? this.openSiteInfo() : this.openSiteInfo(param);
  }

  clickOpenSiteMap(param: string): void {
    this.location.go(`${this.location.path()}/${param}/map`);

    this.openSiteMap(param);
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

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        this.location.go('build/manage-sites');

        if (result) {
          this.snackBar.open('Saved Succesfully', 'Close', {
            duration: 2000
          });
        }
      });
  }

  private openSiteMap(siteName: string): void {
    const site =
      this.sites.find(s => s.name.toLowerCase() === siteName.toLowerCase()) ||
      ({} as Site);

    const dialogRef = this.dialog.open(SiteMapComponent, {
      autoFocus: !site.name,
      width: '90%',
      position: { top: '20px' },
      data: site
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        this.location.go('build/manage-sites');

        if (result) {
          this.snackBar.open('Saved Succesfully', 'Close', {
            duration: 2000
          });
        }
      });
  }
}
