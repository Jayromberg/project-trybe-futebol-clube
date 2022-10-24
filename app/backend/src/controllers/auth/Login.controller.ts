import { Request, Response } from 'express';
import Token from '../../utils/jwt';
import { RequestCustom } from '../../interfaces/user';

export default class LoginController {
  private _jwt: Token;

  constructor(jwt: Token) {
    this._jwt = jwt;
  }

  generateToken(req: Request, res: Response) {
    const request = req as RequestCustom;
    const { id, username, role, email } = request.user;
    const token = this._jwt.generate({ id, username, role, email });
    return res.status(200).json({ token });
  }
}
