import { Request, Response } from 'express';
import FindOneUserService from '../../services/user/FindOneUser.service';

export default class FindOneUserController {
  private _service: FindOneUserService;

  constructor(service: FindOneUserService) {
    this._service = service;
  }

  async handle(req: Request, res: Response) {
    const { email } = req.body;
    const user = await this._service.findOne(email);
    return res.status(200).json(user);
  }
}
