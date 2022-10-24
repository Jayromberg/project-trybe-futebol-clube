import * as local from 'passport-local';
import * as header from 'passport-http-header-strategy';
import * as jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import HttpException from '../../utils/http.exception';
import FindOneUserService from '../user/FindOneUser.service';
import SequelizeFindOneUserRepository
  from '../../repositories/user/SequelizeFindOneUser.repository';

const repository = new SequelizeFindOneUserRepository();
const userService = new FindOneUserService(repository);

const ACCESS_ERROR = 'Incorrect email or password';

const checkPassword = async (password: string, hash: string) => {
  const validPassword = await compare(password, hash);
  if (!validPassword) {
    throw new HttpException(401, ACCESS_ERROR);
  }
};

const localStrategy = (pass: any) => {
  pass.use(new local.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (async (email, password, done) => {
      try {
        const userData = await userService.findOne(email);
        if (!userData) throw new HttpException(401, ACCESS_ERROR);
        await checkPassword(password, userData.password);
        done(null, userData);
      } catch (error) {
        done(error);
      }
    }),
  ));
};

const headerStrategy = (pass: any) => {
  pass.use(new header.Strategy(
    async (token, done) => {
      try {
        const secret: string = process.env.JWT_SECRET || '';
        const payload = jwt.verify(token, secret) as jwt.JwtPayload;
        const userData = await userService.findOne(payload.email);
        if (!userData) throw new HttpException(401, ACCESS_ERROR);
        done(null, payload);
      } catch (error) {
        done(error);
      }
    },
  ));
};

export default (passport: any) => {
  localStrategy(passport);
  headerStrategy(passport);
};
