import { Router } from 'express';

// import accessAuthentication from '../../services/auth/access.authentication';
import FindOneTeamController from '../../controllers/teams/Team.id.controller';
import FindOneTeamService from '../../services/teams/FindOneTeam.service';
import SequelizeFindOneTeamRepository
  from '../../repositories/teams/SequelizeFindOneTeam.repository';

const router = Router();

const repository = new SequelizeFindOneTeamRepository();
const service = new FindOneTeamService(repository);
const controller = new FindOneTeamController(service);

router.get(
  '/teams/:teamId',
  // accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
