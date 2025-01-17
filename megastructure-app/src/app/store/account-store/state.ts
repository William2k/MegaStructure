import { User } from 'src/app/core/models/user.model';

export interface State {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  user: User;
  error: string;
}

export const initialState: State = {
  isLoggedIn: false,
  isLoggingIn: false,
  user: { username: null, emailAddress: null } as User,
  error: null
};
