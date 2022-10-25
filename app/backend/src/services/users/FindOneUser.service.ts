import { IUser } from '../../interfaces/user';

export interface FindOneUserRepository {
  findOne(email: string): Promise<IUser | null>;
}

export default class FindOneUserService {
  private _repository;

  constructor(repository: FindOneUserRepository) {
    this._repository = repository;
  }

  async findOne(email: string) {
    const user = await this._repository.findOne(email);
    return user;
  }
}
