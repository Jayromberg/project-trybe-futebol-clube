import { Request, Response } from 'express';
import CreateMatchService from '../../services/matches/Create.service';

export default class CreateMatchController {
  private _service: CreateMatchService;

  constructor(service: CreateMatchService) {
    this._service = service;
  }

  async handle(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const matches = await this._service.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(matches);
  }
}
