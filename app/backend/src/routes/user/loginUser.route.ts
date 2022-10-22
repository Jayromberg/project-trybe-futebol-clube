import { Router } from 'express';

import Token from '../../util/jwt';
import LoginUserController from '../../controllers/user/LoginUser.controller';
import loginAuthentication from '../../middlewares/login.authentication';

const router = Router();

const service = new Token();
const controller = new LoginUserController(service);

router.post(
  '/login',
  loginAuthentication,
  (req, res) => controller.generateToken(req, res),
);

export default router;
