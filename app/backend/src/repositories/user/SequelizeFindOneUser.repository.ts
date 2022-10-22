import { FindOneUserRepository } from '../../services/user/FindOneUser.service';
import User from '../../database/models/User.model';

export default class SequelizeFindOneUserRepository implements FindOneUserRepository {
  private _user = User;

  async findOne(email: string): Promise<{
    username: string;
    role: string;
    email: string;
    password: string;
  } | null> {
    const findOne = await this._user.findOne({ where: { email } });
    return findOne;
  }
}
