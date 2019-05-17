import { Injectable } from '@angular/core';

import { HomeServiceModule } from './home-service.module';
import { Register, Login } from '../../core/models/account.models';
import { AccountService } from 'src/app/core/services/account.service';

@Injectable({
  providedIn: HomeServiceModule
})
export class HomeService {
  constructor(private accountService: AccountService) {}

  register(form: Register) {
    return this.accountService.register(form);
  }

  login(form: Login) {
    return this.accountService.login(form);
  }
}
