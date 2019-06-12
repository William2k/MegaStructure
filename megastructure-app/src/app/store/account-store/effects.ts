import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, concatMap, share } from 'rxjs/operators';

import * as accountActions from './actions';
import { AccountService } from 'src/app/core/services/account.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions: Actions,
    private accountService: AccountService
  ) {}

  @Effect()
  RegisterRequestEffect$: Observable<Action> = this.actions.pipe(
    ofType<accountActions.RegisterRequestAction>(
      accountActions.ActionTypes.REGISTER_REQUEST
    ),
    concatMap(action =>
      this.accountService.register(action.payload.form).pipe(
        map(result => new accountActions.RegisterSuccessAction()),
        catchError(error =>
          observableOf(new accountActions.RegisterFailureAction({ error }))
        )
      )
    ),
    share()
  );

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions.pipe(
    ofType<accountActions.LoginRequestAction>(
      accountActions.ActionTypes.LOGIN_REQUEST
    ),
    concatMap(action =>
      this.accountService.login(action.payload.form).pipe(
        map(
          result =>
            new accountActions.LoginSuccessAction({
              result
            })
        ),
        catchError(error =>
          observableOf(new accountActions.LoginFailureAction({ error }))
        )
      )
    ),
    share()
  );

  @Effect()
  GetUserRequestEffect$: Observable<Action> = this.actions.pipe(
    ofType<accountActions.GetUserRequestAction>(
      accountActions.ActionTypes.GETUSER_REQUEST
    ),
    concatMap(action =>
      this.accountService.getUser().pipe(
        map(
          result =>
            new accountActions.GetUserSuccessAction({
              result
            })
        ),
        catchError(error =>
          observableOf(new accountActions.GetUserFailureAction({ error }))
        )
      )
    ),
    share()
  );
}
