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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  private subscriptions = new Subscription();

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private router: Router,
    private accountEffects$: AccountEffects
  ) {}

  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    const loginActionSubscription = this.accountEffects$.loginRequestEffect$.subscribe(
      action => {
        if (action.type === AccountStoreActions.ActionTypes.LOGIN_SUCCESS) {
          this.router.navigateByUrl(returnUrl);
        }
      },
      err => this.loginForm.setErrors({ loginFailed: err })
    );

    this.subscriptions.add(loginActionSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  postLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    this.store$.dispatch(
      new LoginRequestAction({ form: this.loginForm.value })
    );
  }
}
