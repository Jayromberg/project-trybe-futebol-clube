export interface UpdateInProgressRepository {
  update(id: number): Promise<void>;
}

export default class UpdateInProgressMatchService {
  private _repository;

  constructor(repository: UpdateInProgressRepository) {
    this._repository = repository;
  }

  async update(id: number) {
    await this._repository.update(id);
  }
}
