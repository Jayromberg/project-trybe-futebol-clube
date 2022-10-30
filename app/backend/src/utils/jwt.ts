import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';

export default class Token {
  private _jwt;

  constructor() {
    this._jwt = jwt;
  }

  public generate(user: Omit<IUser, 'password'>): string {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const secret: string = process.env.JWT_SECRET as string;
    const token = this._jwt.sign(payload, secret);
    return token;
  }
}
