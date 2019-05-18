import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidation } from 'src/app/shared/formValidators/password.validator';

import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
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

  postRegister() {
    if (!this.registerForm.valid) {
      return;
    }

    this.homeService
      .register(this.registerForm.value)
      .subscribe(
        () => this.router.navigate(['']),
        err => this.registerForm.setErrors({ registerFailed: err })
      );
  }
}
