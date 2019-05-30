import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidation } from 'src/app/shared/formValidators/password.validator';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  RootStoreState,
  AccountEffects,
  AccountStoreActions
} from 'src/app/store';
import { Store } from '@ngrx/store';
import { RegisterRequestAction } from 'src/app/store/account-store/actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  registerForm: FormGroup;

  constructor(
    private store$: Store<RootStoreState.State>,
    private accountEffects: AccountEffects,
    private router: Router,
    fb: FormBuilder
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

  ngOnInit(): void {
    this.accountEffects.RegisterRequestEffect$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      action => {
        if (action.type === AccountStoreActions.ActionTypes.REGISTER_SUCCESS) {
          this.router.navigate(['/login']);
        }
      },
      err => this.registerForm.setErrors({ registerFailed: err })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  postRegister(): void {
    if (!this.registerForm.valid) {
      return;
    }

    this.store$.dispatch(
      new RegisterRequestAction({ form: this.registerForm.value })
    );
  }
}
