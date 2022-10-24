import { Application } from 'express';
import httpErrorMiddleware from '../middlewares/http.error';
import auth from './auth';

export default (app: Application) => {
  app.use(
    auth.validate,
    auth.login,
    httpErrorMiddleware,
  );
};
