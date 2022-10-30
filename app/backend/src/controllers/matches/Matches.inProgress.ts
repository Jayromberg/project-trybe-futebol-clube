import { Request, Response } from 'express';
import FindInProgressMatchesService from '../../services/matches/FindInProgress.service';

export default class FindInProgressMatchesController {
  private _service: FindInProgressMatchesService;

  constructor(service: FindInProgressMatchesService) {
    this._service = service;
  }

  async handle(req: Request, res: Response) {
    const { inProgress } = req.query as { inProgress: string };
    const matches = await this._service.findAll(inProgress.toString());
    return res.status(200).json(matches);
  }
}
