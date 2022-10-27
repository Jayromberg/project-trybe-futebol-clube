import { Router } from 'express';

import accessAuthentication from '../../services/auth/access.authentication';
import UpdateScoreboardService from '../../services/matches/Update.scoreboard.service';
import UpdateScoreboardController from '../../controllers/matches/Update.scoreboard.controller';
import SequelizeUpdateScoreboardRepository
  from '../../repositories/matches/SequelizeUpdateScoreboard.repository';

const router = Router();

const repository = new SequelizeUpdateScoreboardRepository();
const service = new UpdateScoreboardService(repository);
const controller = new UpdateScoreboardController(service);

router.patch(
  '/matches/:id',
  accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
