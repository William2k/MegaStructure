import { Action } from '@ngrx/store';

import {
  LoginResult,
  Login,
  Register
} from 'src/app/core/models/account.models';
import { User } from 'src/app/core/models/user.model';

export enum ActionTypes {
  REGISTER_REQUEST = '[Register] Register Request',
  REGISTER_FAILURE = '[Register] Register Failure',
  REGISTER_SUCCESS = '[Register] Register Success',
  LOGIN_REQUEST = '[Login] Login Request',
  LOGIN_FAILURE = '[Login] Login Failure',
  LOGIN_SUCCESS = '[Login] Login Success',
  GETUSER_REQUEST = '[GetUser] GetUser Request',
  GETUSER_FAILURE = '[GetUser] GetUser Failure',
  GETUSER_SUCCESS = '[GetUser] GetUser Success'
}

// Register
export class RegisterRequestAction implements Action {
  readonly type = ActionTypes.REGISTER_REQUEST;
  constructor(public payload: { form: Register }) {}
}

export class RegisterFailureAction implements Action {
  readonly type = ActionTypes.REGISTER_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class RegisterSuccessAction implements Action {
  readonly type = ActionTypes.REGISTER_SUCCESS;
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
  | RegisterRequestAction
  | RegisterFailureAction
  | RegisterSuccessAction
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction
  | GetUserRequestAction
  | GetUserFailureAction
  | GetUserSuccessAction;
