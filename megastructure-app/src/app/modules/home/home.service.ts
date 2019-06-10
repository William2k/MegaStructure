import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeServiceModule } from './home-service.module';
import { Register, Login, LoginResult } from '../../core/models/account.models';
import { AccountService } from 'src/app/core/services/account.service';

@Injectable({
  providedIn: HomeServiceModule
})
export class HomeService {
  constructor(private accountService: AccountService) {}

  register(form: Register): Observable<void> {
    return this.accountService.register(form);
  }

  login(form: Login): Observable<LoginResult> {
    return this.accountService.login(form);
  }
}
