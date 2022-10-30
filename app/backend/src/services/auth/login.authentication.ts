import passport = require('passport');
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/http.exception';
import { schemaEmail, schemaPassword } from '../../utils/joi';

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

const validateEmail = (req: Request) => {
  const { email } = req.body;
  const { error } = schemaEmail.validate({ email });
  if (error) {
    throw new HttpException(401, 'Email validation failed');
  }
};

const validatePassword = (req: Request) => {
  const { password } = req.body;
  const { error } = schemaPassword.validate({ password });
  if (error) {
    throw new HttpException(401, 'Password validation failed');
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  emailExists(req);
  passwordExists(req);
  validateEmail(req);
  validatePassword(req);
  passport.authenticate(
    'local',
    (error, user, _info) => {
      if (error) return next(error);
      req.user = user;
      return next();
    },
  )(req, res, next);
};
