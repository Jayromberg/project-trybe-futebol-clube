export interface UpdateScoreboardRepository {
  update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
}

export default class UpdateScoreboardService {
  private _repository;

  constructor(repository: UpdateScoreboardRepository) {
    this._repository = repository;
  }

  async update(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this._repository.update(id, homeTeamGoals, awayTeamGoals);
  }
}
