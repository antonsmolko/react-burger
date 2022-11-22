export type TUser = {
  name: string;
  email: string;
}

export interface IAuthContext {
  user: TUser;
  loggedIn: boolean;
}
