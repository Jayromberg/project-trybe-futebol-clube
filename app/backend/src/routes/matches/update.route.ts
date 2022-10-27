import { Router } from 'express';

import accessAuthentication from '../../services/auth/access.authentication';
import UpdateInProgressMatchService from '../../services/matches/Update.service';
import UpdateInProgressController from '../../controllers/matches/Update.inProgress';
import SequelizeUpdateInProgressRepository
  from '../../repositories/matches/SequelizeUpdateInProgress.repository';

const router = Router();

const repository = new SequelizeUpdateInProgressRepository();
const service = new UpdateInProgressMatchService(repository);
const controller = new UpdateInProgressController(service);

router.patch(
  '/matches/:id/finish',
  accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
