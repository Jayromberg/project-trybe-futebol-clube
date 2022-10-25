import { Request, Response } from 'express';
import { FindOneTeamRepository } from '../../services/teams/FindOneTeam.service';

export default class FindOneTeamController {
  private _service: FindOneTeamRepository;

  constructor(service: FindOneTeamRepository) {
    this._service = service;
  }

  async handle(req: Request, res: Response) {
    const { teamId } = req.params;
    const team = await this._service.findOne(Number(teamId));
    return res.status(200).json(team);
  }
}
