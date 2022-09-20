export interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  expiredAt: number;
}
