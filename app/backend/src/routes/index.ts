import { Application } from 'express';
import httpErrorMiddleware from '../middlewares/http.error';
import user from './user';

export default (app: Application) => {
  app.use(
    user.login,
    httpErrorMiddleware,
  );
};
