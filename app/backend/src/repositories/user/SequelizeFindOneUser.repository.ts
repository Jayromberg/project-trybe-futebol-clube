import { FindOneUserRepository } from '../../services/user/FindOneUser.service';
import User from '../../database/models/User.model';
import { IUser } from '../../interfaces/user';

export default class SequelizeFindOneUserRepository implements FindOneUserRepository {
  private _user = User;

  async findOne(email: string): Promise< IUser | null> {
    const data = await this._user.findOne({ where: { email } });
    return data;
  }
}
