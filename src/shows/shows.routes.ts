import { Router } from 'express';
import * as showController from './shows.controller'
//import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/',  showController.index);
router.get('/:id',  showController.show);
router.post('/',  showController.create);
router.get('/:idShow/episodes/:idEpisode',  showController.getEpisode);

module.exports = router