import { IMatch } from '../../interfaces/match';

export interface FindInProgressMatchesRepository {
  findAll(inProgress: boolean): Promise<IMatch[] | []>;
}

export default class FindInProgressMatchesService {
  private _repository;

  constructor(repository: FindInProgressMatchesRepository) {
    this._repository = repository;
  }

  async findAll(inProgress: string | undefined) {
    const convertedToBool = inProgress === 'true';
    const matches = await this._repository.findAll(convertedToBool);
    return matches;
  }
}
