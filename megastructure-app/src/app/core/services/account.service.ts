import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Register, Login, LoginResult } from '../../core/models/account.models';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userLoggedIn = new BehaviorSubject(false);
  public userLoggedInObservable$: Observable<
    boolean
  > = this.userLoggedIn.asObservable();

  token: string;

  constructor(private apiService: ApiService) {}

  getUser(): Observable<User> {
    this.token = localStorage.getItem('JwtToken');

    if (!this.token) {
      return throwError('Token not found');
    }

    return this.apiService.get<User>(`user`).pipe(
      map(user => {
        this.userLoggedIn.next(true);

        return user;
      })
    );
  }

  register(form: Register): Observable<void> {
    return this.apiService.post('user', form);
  }

  login(form: Login): Observable<LoginResult> {
    return this.apiService.post<LoginResult>('user/login', form).pipe(
      map(result => {
        this.setToken(result.token);
        this.userLoggedIn.next(true);

        return result;
      })
    );
  }

  setToken(token: string): void {
    this.token = token;

    localStorage.setItem('JwtToken', token);
  }
}
