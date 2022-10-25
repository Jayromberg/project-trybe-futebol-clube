import passport = require('passport');
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/http.exception';

const tokenExist = (token: string | undefined) => {
  if (!token) {
    throw new HttpException(400, 'Token not found');
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  tokenExist(token);
  passport.authenticate(
    'header',
    (error, user, _info) => {
      if (error && error.name === 'JsonWebTokenError') {
        return next(new HttpException(401, 'Invalid Token'));
      }

      if (error) return next(error);

      req.user = user;
      return next();
    },
  )(req, res, next);
};
