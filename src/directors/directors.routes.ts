import { Router } from 'express';
import * as directorController from './directors.controller'
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/', authMiddleware, directorController.index);
router.get('/:id', authMiddleware, directorController.show);
router.post('/', authMiddleware, directorController.create);

module.exports = router