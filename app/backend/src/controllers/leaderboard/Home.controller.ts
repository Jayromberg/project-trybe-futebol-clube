import { Request, Response } from 'express';
import LeaderboardHome from '../../services/leaderboard/Leaderboard.home.service';

export default class LeaderboardController {
  private _service: LeaderboardHome;

  constructor(service: LeaderboardHome) {
    this._service = service;
  }

  async handle(_req: Request, res: Response) {
    const points = await this._service.leaderboard();
    return res.status(200).json(points);
  }
}
