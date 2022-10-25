import { Application } from 'express';
import httpErrorMiddleware from '../middlewares/http.error';
import auth from './auth';
import teams from './teams';

export default (app: Application) => {
  app.use(
    auth.validate,
    auth.login,
    teams.findOne,
    teams.findAll,
    httpErrorMiddleware,
  );
};
