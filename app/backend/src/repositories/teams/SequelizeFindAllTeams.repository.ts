import { FindAllTeamsRepository } from '../../services/teams/FindAllTeams.service';
import Team from '../../database/models/Team.model';
import { ITeam } from '../../interfaces/team';

export default class SequelizeFindAllTeamsRepository implements FindAllTeamsRepository {
  private _user = Team;

  async findAll(): Promise<ITeam[] | []> {
    const data = await this._user.findAll();
    return data;
  }
}
