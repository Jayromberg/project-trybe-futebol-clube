import Match from '../../entities/matches/Match.entity';
import { IMatch } from '../../interfaces/match';

export interface CreateMatchRepository {
  create(match: IMatch): Promise<IMatch>;
}

export default class CreateMatchService {
  private _repository;

  constructor(repository: CreateMatchRepository) {
    this._repository = repository;
  }

  async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = new Match(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    const data = await this._repository.create(match);
    return data;
  }
}
