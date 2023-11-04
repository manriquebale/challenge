import { Router } from 'express';
import * as actorController from './actors.controller'
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/', authMiddleware, actorController.index);
router.post('/', authMiddleware, actorController.create);

module.exports = router