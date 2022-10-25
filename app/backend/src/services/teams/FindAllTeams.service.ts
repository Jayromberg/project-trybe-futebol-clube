import { ITeam } from '../../interfaces/team';

export interface FindAllTeamsRepository {
  findAll(): Promise<ITeam[] | []>;
}

export default class FindAllTeamsService {
  private _repository;

  constructor(repository: FindAllTeamsRepository) {
    this._repository = repository;
  }

  async findAll() {
    const teams = await this._repository.findAll();
    return teams;
  }
}
