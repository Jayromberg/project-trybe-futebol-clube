import { Request, Response } from 'express';
import LeaderboardAway from '../../services/leaderboard/Leaderboard.away.service';
import LeaderboardHome from '../../services/leaderboard/Leaderboard.home.service';

export default class LeaderboardController {
  private _service: LeaderboardHome | LeaderboardAway;

  constructor(service: LeaderboardHome | LeaderboardAway) {
    this._service = service;
  }

  async handle(_req: Request, res: Response) {
    const points = await this._service.leaderboard();
    return res.status(200).json(points);
  }
}
