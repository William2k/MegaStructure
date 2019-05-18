export interface Login {
  username: string;
  password: string;
}

export interface LoginResult {
  username: string;
  emailAddress: string;
  token: string;
}

export interface Register {
  username: string;
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
}
