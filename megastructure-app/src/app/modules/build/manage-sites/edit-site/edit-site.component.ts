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
    let link: string;
    let sitename: string;

    this.currentPage$ = this.editSiteService.currentPage$;

    this.route.params
      .pipe(
        switchMap(param => {
          link = param.page;
          sitename = param.sitename;

          return this.store$.select(getUserSites);
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sites => {
        const valid = this.editSiteService.initialise(sitename, link, sites);
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
