import { Request, Response } from 'express';
import { UpdateInProgressRepository } from '../../services/matches/Update.service';

export default class UpdateInProgressController {
  private _service: UpdateInProgressRepository;

  constructor(service: UpdateInProgressRepository) {
    this._service = service;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.update(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}
