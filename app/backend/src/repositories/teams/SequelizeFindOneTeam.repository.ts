import { FindOneTeamRepository } from '../../services/teams/FindOneTeam.service';
import Team from '../../database/models/Team.model';
import { ITeam } from '../../interfaces/team';

export default class SequelizeFindOneTeamRepository implements FindOneTeamRepository {
  private _user = Team;

  async findOne(id: number): Promise<ITeam | null> {
    const data = await this._user.findOne({ where: { id } });
    return data;
  }
}
