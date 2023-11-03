import { Router } from 'express';
import * as actorController from './actors.controller'
//import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/',  actorController.index);
module.exports = router