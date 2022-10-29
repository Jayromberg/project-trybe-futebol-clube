import { Router } from 'express';

// import accessAuthentication from '../../services/auth/access.authentication';
import LeaderboardController from '../../controllers/leaderboard/Home.controller';
import FindAllMatchesService from '../../services/matches/FindAllMatches.service';
import SequelizeFindAllMatchesRepository
  from '../../repositories/matches/SequelizeFindAllMatches.repository';
import LeaderboardHomeService from '../../services/leaderboard/Leaderboard.home.service';

const router = Router();

const repository = new SequelizeFindAllMatchesRepository();
const service = new FindAllMatchesService(repository);
const dataProcessing = new LeaderboardHomeService(service);
const controller = new LeaderboardController(dataProcessing);

router.get(
  '/leaderboard/home',
  // accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
