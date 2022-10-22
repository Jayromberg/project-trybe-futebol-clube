import { Application } from 'express';
import user from './user';
import httpErrorMiddleware from '../middlewares/http.error';

export default (app: Application) => {
  app.use(
    user.login,
    httpErrorMiddleware,
  );
};
