import { Router } from 'express';
import SequelizeFindOneUserRepository
  from '../../repositories/user/SequelizeFindOneUser.repository';
import FindOneUserService from '../../services/user/FindOneUser.service';
import FindOneUserController from '../../controllers/user/FindOneUser.controller';
import loginAuthentication from '../../middlewares/login.authentication';

const router = Router();

const repository = new SequelizeFindOneUserRepository();
const service = new FindOneUserService(repository);
const controller = new FindOneUserController(service);

router.post(
  '/login',
  loginAuthentication,
  (req, res) => controller.handle(req, res),
);

export default router;
