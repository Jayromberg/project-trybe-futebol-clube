import { ITeam } from '../../interfaces/team';

export interface FindOneTeamRepository {
  findOne(id: number): Promise<ITeam | null>;
}

export default class FindOneTeamService {
  private _repository;

  constructor(repository: FindOneTeamRepository) {
    this._repository = repository;
  }

  async findOne(id: number) {
    const teams = await this._repository.findOne(id);
    return teams;
  }
}
