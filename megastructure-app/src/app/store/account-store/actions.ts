import { Action } from '@ngrx/store';

import { LoginResult, Login } from 'src/app/core/models/account.models';
import { User } from 'src/app/core/models/user.model';

export enum ActionTypes {
  LOGIN_REQUEST = '[Login Page] Login Request',
  LOGIN_FAILURE = '[Login Page] Login Failure',
  LOGIN_SUCCESS = '[Login Page] Login Success',
  GETUSER_REQUEST = '[Initialisation] GetUser Request',
  GETUSER_FAILURE = '[Initialisation] GetUser Failure',
  GETUSER_SUCCESS = '[Initialisation] GetUser Success'
}

// Login
export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;
  constructor(public payload: { form: Login }) {}
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { result: LoginResult }) {}
}

// GetUser
export class GetUserRequestAction implements Action {
  readonly type = ActionTypes.GETUSER_REQUEST;
}

export class GetUserFailureAction implements Action {
  readonly type = ActionTypes.GETUSER_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class GetUserSuccessAction implements Action {
  readonly type = ActionTypes.GETUSER_SUCCESS;
  constructor(public payload: { result: User }) {}
}

export type Actions =
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction;
