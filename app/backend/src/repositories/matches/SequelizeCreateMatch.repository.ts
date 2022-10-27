import { CreateMatchRepository } from '../../services/matches/Create.service';
import Match from '../../database/models/Match.model';
import { IMatch } from '../../interfaces/match';

export default class SequelizeCreateMatchRepository implements CreateMatchRepository {
  private _matches = Match;

  async create(match: IMatch): Promise<IMatch> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;

    const data = await this._matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    return data;
  }
}
