import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { RootStoreState } from 'src/app/store';
import { LoginRequestAction } from 'src/app/store/account-store/actions';
import {
  AccountEffects,
  AccountStoreActions
} from 'src/app/store/account-store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private router: Router,
    private accountEffects$: AccountEffects
  ) {}

  ngOnInit(): void {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.accountEffects$.loginRequestEffect$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        action => {
          if (action.type === AccountStoreActions.ActionTypes.LOGIN_SUCCESS) {
            this.router.navigateByUrl(returnUrl);
          }
        },
        err => this.loginForm.setErrors({ loginFailed: err })
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  postLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.store$.dispatch(
      new LoginRequestAction({ form: this.loginForm.value })
    );
  }
}
