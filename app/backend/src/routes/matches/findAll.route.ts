import { Router } from 'express';

// import accessAuthentication from '../../services/auth/access.authentication';
import FindAllMatchesController from '../../controllers/matches/Matches.controller';
import FindAllMatchesService from '../../services/matches/FindAllMatches.service';
import SequelizeFindAllMatchesRepository
  from '../../repositories/matches/SequelizeFindAllMatches.repository';

import FindInProgressMatchesController from '../../controllers/matches/Matches.inProgress';
import FindInProgressMatchesService from '../../services/matches/FindInProgress.service';
import SequelizeFindInProgressMatchesRepository
  from '../../repositories/matches/SequelizeFindInProgress.repository';

import redirectionMatches from '../../middlewares/redirection.matches';

const router = Router();

const repository = new SequelizeFindAllMatchesRepository();
const service = new FindAllMatchesService(repository);
const controller = new FindAllMatchesController(service);

const repositoryInProgress = new SequelizeFindInProgressMatchesRepository();
const serviceInProgress = new FindInProgressMatchesService(repositoryInProgress);
const controllerInProgress = new FindInProgressMatchesController(serviceInProgress);

router.get(
  '/matches',
  // accessAuthentication,
  redirectionMatches(controller, controllerInProgress),
);

export default router;
