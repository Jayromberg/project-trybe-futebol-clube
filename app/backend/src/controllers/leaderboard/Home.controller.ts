import { Request, Response } from 'express';
import LeaderboardService from '../../services/leaderboard/Leaderboard.service';

export default class LeaderboardController {
  private _service: LeaderboardService;

  constructor(service: LeaderboardService) {
    this._service = service;
  }

  async handle(_req: Request, res: Response) {
    const points = await this._service.leaderboard();
    return res.status(200).json(points);
  }
}
