import passport = require('passport');
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/http.exception';

const emailExists = (req: Request) => {
  const { email } = req.body;
  if (!email) {
    throw new HttpException(400, 'All fields must be filled');
  }
};

const passwordExists = (req: Request) => {
  const { password } = req.body;
  if (!password) {
    throw new HttpException(400, 'All fields must be filled');
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  emailExists(req);
  passwordExists(req);
  passport.authenticate(
    'local',
    (error, user, _info) => {
      if (error) return next(error);
      req.user = user;
      return next();
    },
  )(req, res, next);
};