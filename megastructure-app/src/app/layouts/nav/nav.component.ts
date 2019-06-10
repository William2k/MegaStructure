import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AccountService } from 'src/app/core/services/account.service';
import { AccountStoreState } from 'src/app/store';
import { getCurrentUsername } from 'src/app/store/account-store/selectors';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  username: string;
  userLoggedIn: boolean;

  constructor(
    private accountService: AccountService,
    private store$: Store<AccountStoreState.State>
  ) {}

  ngOnInit(): void {
    this.accountService.userLoggedInObservable$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.userLoggedIn = value);

    this.store$
      .select(getCurrentUsername)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(username => this.username = username);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
