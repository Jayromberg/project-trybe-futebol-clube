import { Request, Response } from 'express';
import { FindAllMatchesRepository } from '../../services/matches/FindAllMatches.service';

export default class FindAllMatchesController {
  private _service: FindAllMatchesRepository;

  constructor(service: FindAllMatchesRepository) {
    this._service = service;
  }

  async handle(req: Request, res: Response) {
    const matches = await this._service.findAll();
    return res.status(200).json(matches);
  }
}
