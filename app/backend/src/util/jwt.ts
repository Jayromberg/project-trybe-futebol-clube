import * as jwt from 'jsonwebtoken';

interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export default class Token {
  private _jwt;

  constructor() {
    this._jwt = jwt;
  }

  public generate(user: IUser): string {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const secret: string = process.env.JWT_SECRET || '';
    const token = this._jwt.sign(payload, secret);
    return token;
  }
}
