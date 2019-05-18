import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(private router: Router, private homeService: HomeService) {}

  postLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    this.homeService
      .login(this.loginForm.value)
      .subscribe(
        () => this.router.navigate(['']),
        err => this.loginForm.setErrors({ loginFailed: err })
      );
  }
}
