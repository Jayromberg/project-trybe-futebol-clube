import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { compare } from 'bcryptjs';

import SequelizeFindOneUserRepository from '../repositories/user/SequelizeFindOneUser.repository';
import FindOneUserService from '../services/user/FindOneUser.service';

const repository = new SequelizeFindOneUserRepository();
const userService = new FindOneUserService(repository);

const LocalStrategy = Strategy;

const checkPassword = async (password: string, hash: string) => {
  const validPassword = await compare(password, hash);
  if (!validPassword) {
    throw new Error('Invalid password');
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
        if (!userData) throw new Error('User not found');
        checkPassword(password, userData.password);
        done(null, userData);
      } catch (error) {
        done(error);
      }
    }),
  ));
};

export default (passport: PassportStatic) => {
  loginStrategy(passport);
};
