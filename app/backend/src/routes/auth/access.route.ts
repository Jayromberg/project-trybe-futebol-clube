import { Router } from 'express';

import accessAuthentication from '../../services/auth/access.authentication';
import AccessController from '../../controllers/auth/access.controller';

const router = Router();

const controller = new AccessController();

router.get(
  '/login/validate',
  accessAuthentication,
  (req, res) => controller.role(req, res),
);

export default router;
