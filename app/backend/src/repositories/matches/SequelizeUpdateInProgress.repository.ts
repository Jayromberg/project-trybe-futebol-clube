import { UpdateInProgressRepository } from '../../services/matches/Update.service';
import Match from '../../database/models/Match.model';

export default class SequelizeUpdateInProgressRepository implements UpdateInProgressRepository {
  private _matches = Match;

  async update(id: number): Promise<void> {
    await this._matches.update({ inProgress: false }, { where: { id } });
  }
}
