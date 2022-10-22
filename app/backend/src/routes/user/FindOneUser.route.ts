import { Router } from 'express';
import SequelizeUserRepository from '../../repositories/SequelizeUser.repository';
import FindOneUserService from '../../services/user/FindOneUser.service';
import FindOneUserController from '../../controllers/user/FindOneUser.controller';

const router = Router();

const repository = new SequelizeUserRepository();
const service = new FindOneUserService(repository);
const controller = new FindOneUserController(service);

router.post('/login', (req, res) => controller.handle(req, res));

export default router;
