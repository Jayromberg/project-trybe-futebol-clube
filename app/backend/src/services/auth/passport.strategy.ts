import { Strategy } from 'passport-local';
import { compare } from 'bcryptjs';

import HttpException from '../../utils/http.exception';
import FindOneUserService from '../user/FindOneUser.service';
import SequelizeFindOneUserRepository
  from '../../repositories/user/SequelizeFindOneUser.repository';

const repository = new SequelizeFindOneUserRepository();
const userService = new FindOneUserService(repository);

const checkPassword = async (password: string, hash: string) => {
  const validPassword = await compare(password, hash);
  if (!validPassword) {
    throw new HttpException(401, 'Incorrect email or password');
  }
};

const loginStrategy = (pass: any) => {
  pass.use(new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (async (email, password, done) => {
      try {
        const userData = await userService.findOne(email);
        if (!userData) throw new HttpException(401, 'Incorrect email or password');
        await checkPassword(password, userData.password);
        done(null, userData);
      } catch (error) {
        done(error);
      }
    }),
  ));
};

export default (passport: any) => {
  loginStrategy(passport);
};
