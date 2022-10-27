import { FindAllMatchesRepository } from '../../services/matches/FindAllMatches.service';
import Match from '../../database/models/Match.model';
import Team from '../../database/models/Team.model';
import { IMatchResponse } from '../../interfaces/match';

export default class SequelizeFindAllMatchesRepository implements FindAllMatchesRepository {
  private _matches = Match;

  async findAll(): Promise<IMatchResponse[] | []> {
    const data = await this._matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return data;
  }
}
