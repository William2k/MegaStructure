import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Store } from '@ngrx/store';
import { AccountStoreState, AccountStoreActions } from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private store$: Store<AccountStoreState.State>) {}

  initialise(): void {
    console.log('Initialisation');

    this.store$.dispatch(new AccountStoreActions.GetUserRequestAction());
  }
}
