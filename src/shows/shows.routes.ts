import { Router } from 'express';
import * as showController from './shows.controller'
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/', authMiddleware, showController.index);
router.get('/:id', authMiddleware, showController.show);
router.post('/', authMiddleware, showController.create);
router.get('/:idShow/episodes/:idEpisode', authMiddleware, showController.getEpisode);

module.exports = router