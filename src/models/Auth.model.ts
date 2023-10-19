import { UserModel } from ".";

export interface AuthInteface {
    loggedIn: boolean,
    user: UserModel | null,
  }
  