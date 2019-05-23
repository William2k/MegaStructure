import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AccountService } from 'src/app/core/services/account.service';
import { AccountStoreState } from 'src/app/store';
import { getCurrentUsername } from 'src/app/store/account-store/selectors';


@Component({
  selector: 'app-build-nav',
  templateUrl: './build-nav.component.html',
  styleUrls: ['./build-nav.component.scss']
})
export class BuildNavComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  username: string;

  constructor(
    private store$: Store<AccountStoreState.State>
  ) {}

  ngOnInit() {
    this.store$
      .select(getCurrentUsername)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(username => (this.username = username));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
