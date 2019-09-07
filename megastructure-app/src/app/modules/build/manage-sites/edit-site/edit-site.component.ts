import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { getUserSites } from 'src/app/store/site-store/selectors';
import { RootStoreState } from 'src/app/store';
import { SitePage } from 'src/app/core/models/site.model';
import { EditSiteService } from './edit-site.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  currentPage$: Observable<SitePage>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private router: Router,
    private route: ActivatedRoute,
    private editSiteService: EditSiteService
  ) {}

  ngOnInit(): void {
    let pageLink: string;
    let sitename: string;

    this.currentPage$ = this.editSiteService.currentPage$;

    this.route.url
      .pipe(
        switchMap(segments => {
          sitename = segments[0].path || '';

          const lastPath = segments[segments.length - 1].path || '';

          pageLink =
            lastPath.toLowerCase() !== sitename.toLowerCase() ? lastPath : '';

          return this.store$.select(getUserSites);
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sites => {
        const valid = this.editSiteService.initialise(sitename, pageLink, sites);
        if (!valid) {
          this.router.navigate(['build', 'manage-sites']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addElem(parentRef: number): void {
    this.editSiteService.addElem(parentRef);
  }
}
