import { IMatchResponse } from '../../interfaces/match';

export interface FindAllMatchesRepository {
  findAll(): Promise<IMatchResponse[] | []>;
}

export default class FindAllMatchesService {
  private _repository;

  constructor(repository: FindAllMatchesRepository) {
    this._repository = repository;
  }

  async findAll() {
    const matches = await this._repository.findAll();
    return matches;
  }
}
