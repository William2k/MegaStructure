import { Injectable, OnInit } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Subject } from 'rxjs';
import { AccountService } from './services/account.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  private userLoggedIn: boolean;
  private unsubscribe$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.userLoggedInObservable$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => (this.userLoggedIn = value));
  }

  ngOnInit(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.loggedInGuard(state);
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.loggedInGuard(state);
  }

  loggedInGuard(state: RouterStateSnapshot): boolean {
    if (!this.userLoggedIn) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }
}
