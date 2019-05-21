import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidation } from 'src/app/shared/formValidators/password.validator';

import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  RootStoreState,
  AccountEffects,
  AccountStoreActions
} from 'src/app/store';
import { Store } from '@ngrx/store';
import { RegisterRequestAction } from 'src/app/store/account-store/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  registerForm: FormGroup;

  constructor(
    private store$: Store<RootStoreState.State>,
    private accountEffects: AccountEffects,
    private router: Router,
    fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.registerForm = fb.group(
      {
        username: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
  }

  ngOnInit() {
    const registerActionSubscription = this.accountEffects.RegisterRequestEffect$.subscribe(
      action => {
        if (action.type === AccountStoreActions.ActionTypes.REGISTER_SUCCESS) {
          this.router.navigate(['/login']);
        }
      },
      err => this.registerForm.setErrors({ registerFailed: err })
    );

    this.subscriptions.add(registerActionSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  postRegister() {
    if (!this.registerForm.valid) {
      return;
    }

    this.store$.dispatch(
      new RegisterRequestAction({ form: this.registerForm.value })
    );
  }
}
