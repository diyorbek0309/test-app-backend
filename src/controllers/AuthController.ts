import { Request, Response } from 'express';
import User from '../models/UserSchema';
import { IUser } from '../types/iSchemas';
import { APIResponse } from '../lib/APIResponse';
import Auth from '../lib/Auth';
import { genSalt, hash } from 'bcryptjs';

export default class {
  auth: Auth;
  constructor() {
    this.auth = new Auth();
  }
  register = async (req: Request, res: Response) => {
    try {
      const existingUser: IUser | null = await User.findOne({
        username: req.body.username,
      });

      if (existingUser) {
        return new APIResponse(res).error(400, 'USER_EXIST');
      }

      const data = req.body;
      const salt = await genSalt(10);
      data.password = await hash(data.password, salt);

      const savedUser: IUser = await User.create(data);
      delete savedUser.password;

      return new APIResponse(res).success(savedUser);
    } catch (error) {
      return new APIResponse(res).error(500, 'SERVER_ERROR', error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      let user = null;

      const query = { phone: data.phone };

      user = await User.findOne(query).lean();

      if (!user) {
        return new APIResponse(res).error(400, 'INVALID_CREDINTIALS');
      }
      const password: string = user.password!;
      const checkUser: boolean | Error = await this.auth.checkUserPassword(data.password, password);

      if (!checkUser) {
        return new APIResponse(res).error(400, 'INVALID_CREDINTIALS');
      }
      const existingUser = { ...user };
      delete existingUser.password;
      const tokens = await this.auth.jwtSign(existingUser);

      const userData = {
        user: existingUser,
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      };
      return new APIResponse(res).success(userData);
    } catch (error) {
      return new APIResponse(res).error(500, 'SERVER_ERROR', error);
    }
  };
}
