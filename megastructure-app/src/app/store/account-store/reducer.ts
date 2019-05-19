import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';
import { User } from 'src/app/core/models/user.model';

export const accountReducer = (
  state = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true
      };
    }
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        user: {
          username: action.payload.result.username,
          emailAddress: action.payload.result.emailAddress
        } as User
      };
    }
    case ActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
};
