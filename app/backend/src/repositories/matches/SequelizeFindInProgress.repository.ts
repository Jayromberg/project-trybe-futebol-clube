import { FindInProgressMatchesRepository } from '../../services/matches/FindInProgress.service';
import Match from '../../database/models/Match.model';
import Team from '../../database/models/Team.model';
import { IMatchResponse } from '../../interfaces/match';

export default class SequelizeFindInProgressMatchesRepository
implements FindInProgressMatchesRepository {
  private _matches = Match;

  async findAll(inProgress: boolean): Promise<IMatchResponse[] | []> {
    const data = await this._matches.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return data;
  }
}
