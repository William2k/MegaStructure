import { Component, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy {
  subscriptions = new Subscription();
  userLoggedIn: boolean;

  constructor(private accountService: AccountService) {
    this.subscriptions.add(this.accountService.userLoggedInObservable$.subscribe(value => this.userLoggedIn = value));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
