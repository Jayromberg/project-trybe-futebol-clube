import { Router } from 'express';

import accessAuthentication from '../../services/auth/access.authentication';
import CreateMatchService from '../../services/matches/Create.service';
import CreateMatchController from '../../controllers/matches/Create.controller';
import SequelizeCreateMatchRepository
  from '../../repositories/matches/SequelizeCreateMatch.repository';

const router = Router();

const repository = new SequelizeCreateMatchRepository();
const service = new CreateMatchService(repository);
const controller = new CreateMatchController(service);

router.post(
  '/matches',
  accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
