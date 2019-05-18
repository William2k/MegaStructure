import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private accountService: AccountService) {}

  initialise(): void {
    console.log('Initialisation');

    this.accountService.getUser().subscribe();
  }
}
