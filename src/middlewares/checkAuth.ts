import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../lib/APIResponse';
import Auth from '../lib/Auth';
const auth = new Auth();

export default class {
  static checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return new APIResponse(res).error(401, 'UNAUTHORIZED');
      }
      const verify: any = await auth.checkToken(token);

      if (!verify.success) {
        return new APIResponse(res).error(400, verify.msg);
      }
      if (!verify.data) {
        return new APIResponse(res).error(401, 'UNAUTHORIZED');
      }
      const user = verify.data;
      delete user.iat;
      delete user.exp;

      req['user'] = { ...user };
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
