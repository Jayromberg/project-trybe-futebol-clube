import { Application } from 'express';
import user from './user';

export default (app: Application) => {
  app.use(
    user.findOneUserRoute,
  );
};
