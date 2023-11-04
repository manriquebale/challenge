import { Router } from 'express';
import * as movieController from './movies.controller'
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/', authMiddleware, movieController.index);
router.get('/:id', authMiddleware, movieController.show);
router.post('/', authMiddleware, movieController.create);

module.exports = router