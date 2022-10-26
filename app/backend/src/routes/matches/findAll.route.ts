import { Router } from 'express';

// import accessAuthentication from '../../services/auth/access.authentication';
import FindAllMatchesController from '../../controllers/matches/Matches.controller';
import FindAllMatchesService from '../../services/matches/FindAllMatches.service';
import SequelizeFindAllMatchesRepository
  from '../../repositories/matches/SequelizeFindAllMatches.repository';

const router = Router();

const repository = new SequelizeFindAllMatchesRepository();
const service = new FindAllMatchesService(repository);
const controller = new FindAllMatchesController(service);

router.get(
  '/matches',
  // accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
