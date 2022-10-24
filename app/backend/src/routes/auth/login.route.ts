import { Router } from 'express';

import Token from '../../utils/jwt';
import LoginController from '../../controllers/auth/Login.controller';
import loginAuthentication from '../../services/auth/login.authentication';

const router = Router();

const service = new Token();
const controller = new LoginController(service);

router.post(
  '/login',
  loginAuthentication,
  (req, res) => controller.generateToken(req, res),
);

export default router;
