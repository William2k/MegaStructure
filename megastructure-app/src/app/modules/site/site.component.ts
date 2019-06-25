import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, take, skip } from 'rxjs/operators';

import { RootStoreState } from 'src/app/store';
import {
  GetLiveSiteRequestAction,
  GetLivePageRequestAction
} from 'src/app/store/site-store/actions';
import { SitePage, Site } from 'src/app/core/models/site.model';
import { getSiteState } from 'src/app/store/site-store/selectors';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  currentPage: SitePage;

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let sitename: string;
    let pageLink: string;

    this.route.params
      .pipe(
        switchMap(params => {
          sitename = params.sitename || '';
          pageLink = params.page || '';

          this.store$.dispatch(new GetLiveSiteRequestAction({ sitename }));

          return this.store$.select(getSiteState);
        }),
        skip(1),
        take(1)
      )
      .subscribe(siteState => {
        const currentSite = siteState.sites.find(
          site => site.name.toLowerCase() === sitename.toLowerCase()
        );

        this.intialise(currentSite, pageLink);
      });
  }

  intialise(currentSite: Site, pageLink: string): void {
    if (!currentSite) {
      this.router.navigate(['site', 'not-found']);
      return;
    }

    const currentPage = currentSite.pages.find(
      page => page.link.toLowerCase() === pageLink.toLowerCase()
    );

    this.currentPage = currentPage;

    if (!currentPage.content) {
      this.store$.dispatch(
        new GetLivePageRequestAction({
          sitename: currentSite.name,
          pageRef: currentPage.pageRef
        })
      );
    }
  }
}
