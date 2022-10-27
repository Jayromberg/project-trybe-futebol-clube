import { Request, Response, NextFunction } from 'express';
import FindAllMatchesController from '../controllers/matches/Matches.controller';
import FindInProgressMatchesController from '../controllers/matches/Matches.inProgress';

const redirectionMatches = (
  controllerCommon: FindAllMatchesController,
  controllerInProgress: FindInProgressMatchesController,
) => (req: Request, res: Response, _next: NextFunction) => {
  const { inProgress } = req.query;

  if (inProgress) {
    return controllerInProgress.handle(req, res);
  }

  return controllerCommon.handle(req, res);
};

export default redirectionMatches;
