import { Router } from 'express';

// import accessAuthentication from '../../services/auth/access.authentication';
import LeaderboardController from '../../controllers/leaderboard/Home.controller';
import FindAllMatchesService from '../../services/matches/FindAllMatches.service';
import SequelizeFindAllMatchesRepository
  from '../../repositories/matches/SequelizeFindAllMatches.repository';
import LeaderboardAway from '../../services/leaderboard/Leaderboard.away.service';

const router = Router();

const repository = new SequelizeFindAllMatchesRepository();
const service = new FindAllMatchesService(repository);
const dataProcessing = new LeaderboardAway(service);
const controller = new LeaderboardController(dataProcessing);

router.get(
  '/leaderboard/away',
  // accessAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
