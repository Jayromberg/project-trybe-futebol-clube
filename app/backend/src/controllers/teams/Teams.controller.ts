import { Request, Response } from 'express';
import { FindAllTeamsRepository } from '../../services/teams/FindAllTeams.service';

export default class FindAllTeamsController {
  private _service: FindAllTeamsRepository;

  constructor(service: FindAllTeamsRepository) {
    this._service = service;
  }

  async handle(_req: Request, res: Response) {
    const teams = await this._service.findAll();
    return res.status(200).json(teams);
  }
}
