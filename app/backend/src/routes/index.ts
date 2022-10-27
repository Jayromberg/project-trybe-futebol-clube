import { Application } from 'express';
import httpErrorMiddleware from '../middlewares/http.error';
import auth from './auth';
import teams from './teams';
import matches from './matches';

export default (app: Application) => {
  app.use(
    auth.validate,
    auth.login,
    teams.findOne,
    teams.findAll,
    matches.update,
    matches.findAll,
    matches.create,
    httpErrorMiddleware,
  );
};
