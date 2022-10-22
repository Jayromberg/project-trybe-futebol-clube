import { Request, Response } from 'express';
import Token from '../../util/jwt';

export interface RequestCustom extends Request {
  user:{
    id: number;
    username: string;
    role: string;
    email: string;
    password: string;
  };
}

export default class LoginUserController {
  private _jwt: Token;

  constructor(jwt: Token) {
    this._jwt = jwt;
  }

  generateToken(req: Request, res: Response) {
    const request = req as RequestCustom;
    const { id, username, role, email, password } = request.user;
    const token = this._jwt.generate({ id, username, role, email, password });
    return res.status(200).json({ token });
  }
}
