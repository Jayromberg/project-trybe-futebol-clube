// import CommonUser from '../../entities/user/CommonUser.entity';
// import AdminUser from '../../entities/user/AdminUser.entity';
// import User, { Role } from '../../entities/user/User.entity';

export interface FindOneUserRepository {
  findOne(email: string): Promise<{
    username: string,
    role: string,
    email: string,
    password: string,
  } | null>;
}

export default class FindOneUserService {
  // private _commonUser: CommonUser;
  // private _adminUser: AdminUser;
  private _repository;

  constructor(repository: FindOneUserRepository) {
    this._repository = repository;
  }

  async findOne(email: string) {
    const user = await this._repository.findOne(email);
    // const userInstance = this.getUserInstance(email, password, 'admin');
    return user;
  }

  // private getUserInstance(email: string, password: string, role: string): User {
  //   if (role === Role.admin) {
  //     this._adminUser = new AdminUser(email, password);
  //     return this._adminUser;
  //   }
  //   if (role === Role.user) {
  //     this._commonUser = new CommonUser(email, password);
  //     return this._commonUser;
  //   }
  //   throw new Error('INVALID_ROLE');
  // }
}
