import { Application } from 'express';
import 'express-async-errors';
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
    matches.updateScoreboard,
    matches.findAll,
    matches.create,
    httpErrorMiddleware,
  );
};
