import Match from '../../entities/matches/Match.entity';
import SequelizeFindOneTeamRepository
  from '../../repositories/teams/SequelizeFindOneTeam.repository';
import HttpException from '../../utils/http.exception';
import { IMatch } from '../../interfaces/match';

export interface CreateMatchRepository {
  create(match: IMatch): Promise<IMatch>;
}

export default class CreateMatchService {
  private _repository;
  private _team: SequelizeFindOneTeamRepository;

  constructor(repository: CreateMatchRepository) {
    this._repository = repository;
    this._team = new SequelizeFindOneTeamRepository();
  }

  async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = new Match(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    await this.teamExist(homeTeam);
    await this.teamExist(awayTeam);
    const data = await this._repository.create(match);
    return data;
  }

  private async teamExist(id: number) {
    const team = await this._team.findOne(id);
    if (!team) throw new HttpException(404, 'There is no team with such id!');
  }
}
