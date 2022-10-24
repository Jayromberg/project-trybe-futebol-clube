import { Request } from 'express';

export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface RequestCustom extends Request {
  user: IUser;
}
