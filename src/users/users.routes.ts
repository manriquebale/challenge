import { Router } from 'express';
import * as userController from './users.controller'
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/', authMiddleware, userController.index);
router.get('/:id', authMiddleware, userController.show);


module.exports = router