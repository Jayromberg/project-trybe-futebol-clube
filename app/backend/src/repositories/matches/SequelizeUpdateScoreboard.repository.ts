import { UpdateScoreboardRepository } from '../../services/matches/Update.scoreboard.service';
import Match from '../../database/models/Match.model';

export default class SequelizeUpdateScoreboardRepository implements UpdateScoreboardRepository {
  private _matches = Match;

  async update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this._matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
