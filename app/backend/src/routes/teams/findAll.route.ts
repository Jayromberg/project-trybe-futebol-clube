import { Router } from 'express';

// import accessAuthentication from '../../services/auth/access.authentication';
import FindAllTeamsController from '../../controllers/teams/Teams.controller';
import FindAllTeamsService from '../../services/teams/FindAllTeams.service';
import SequelizeFindAllTeamsRepository
  from '../../repositories/teams/SequelizeFindAllTeams.repository';

const router = Router();

const repository = new SequelizeFindAllTeamsRepository();
const service = new FindAllTeamsService(repository);
const controller = new FindAllTeamsController(service);

router.get(
  '/teams',
  // accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
