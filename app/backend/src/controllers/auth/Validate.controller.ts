import { Request, Response } from 'express';
import { RequestCustom } from '../../interfaces/user';

export default class ValidateController {
  private _request: RequestCustom;

  role(req: Request, res: Response) {
    this._request = req as RequestCustom;
    const { role } = this._request.user;
    return res.status(200).json({ role });
  }
}
