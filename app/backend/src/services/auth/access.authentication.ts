import passport = require('passport');
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/http.exception';

const tokenExist = (token: string | undefined) => {
  if (!token) {
    throw new HttpException(400, 'TOKEN_NOT_FOUND');
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  tokenExist(token);
  passport.authenticate(
    'header',
    (error, user, _info) => {
      if (error && error.name === 'JsonWebTokenError') {
        return next(new Error('INVALID_TOKEN'));
      }

      if (error) return next(error);

      req.user = user;
      return next();
    },
  )(req, res, next);
};
