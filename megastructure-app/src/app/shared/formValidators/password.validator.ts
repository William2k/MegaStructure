import { AbstractControl } from '@angular/forms';
export class PasswordValidation {
  static MatchPassword(control: AbstractControl): void {
    const confirmPasswordControl = control.get('confirmPassword');

    const password = control.get('password').value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ MatchPassword: true });
    }
  }
}
