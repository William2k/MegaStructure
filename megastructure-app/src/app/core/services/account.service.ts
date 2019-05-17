import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Register, Login } from '../../core/models/account.models';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private apiService: ApiService) {}

  register(form: Register): Observable<void> {
    return this.apiService.post('user', form);
  }

  login(form: Login): Observable<string> {
    return this.apiService.post('user/login', form);
  }
}
