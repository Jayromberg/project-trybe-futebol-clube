import passport = require('passport');
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (error, user, _info) => {
      if (error) return next(error);
      req.user = user;
      return next();
    },
  )(req, res, next);
};
