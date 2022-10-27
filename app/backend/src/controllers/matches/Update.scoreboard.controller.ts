import { Request, Response } from 'express';
import { UpdateScoreboardRepository } from '../../services/matches/Update.scoreboard.service';

export default class UpdateScoreboardController {
  private _service: UpdateScoreboardRepository;

  constructor(service: UpdateScoreboardRepository) {
    this._service = service;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.update(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json({ message: 'Updated score' });
  }
}
