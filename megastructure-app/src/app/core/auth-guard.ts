import { Injectable, OnInit } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';

@Injectable()
export class AuthGuard implements CanActivate, OnInit {
  private userLoggedIn: boolean;
  private subscriptions = new Subscription();

  constructor(private accountService: AccountService, private router: Router) {
    this.subscriptions.add(
      this.accountService.userLoggedInObservable$.subscribe(
        value => (this.userLoggedIn = value)
      )
    );
  }

  ngOnInit() {
    this.subscriptions.unsubscribe();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userLoggedIn) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }
}
