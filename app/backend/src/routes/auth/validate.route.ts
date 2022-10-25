import { Router } from 'express';

import accessAuthentication from '../../services/auth/access.authentication';
import ValidateController from '../../controllers/auth/Validate.controller';

const router = Router();

const controller = new ValidateController();

router.get(
  '/login/validate',
  accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
