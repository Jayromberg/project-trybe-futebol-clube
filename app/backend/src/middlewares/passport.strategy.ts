import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { compare } from 'bcryptjs';

import SequelizeFindOneUserRepository from '../repositories/user/SequelizeFindOneUser.repository';
import FindOneUserService from '../services/user/FindOneUser.service';
import HttpException from '../util/http.exception';

const repository = new SequelizeFindOneUserRepository();
const userService = new FindOneUserService(repository);

const LocalStrategy = Strategy;

const checkPassword = async (password: string, hash: string) => {
  const validPassword = await compare(password, hash);
  if (!validPassword) {
    throw new HttpException(401, 'Incorrect email or password');
  }
};

const loginStrategy = (pass: PassportStatic) => {
  pass.use(new LocalStrategy(
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
        console.log('oi');
        done(error);
      }
    }),
  ));
};

export default (passport: PassportStatic) => {
  loginStrategy(passport);
};
