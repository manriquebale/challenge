import { Router } from 'express';
import * as directorController from './directors.controller'
//import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/',  directorController.index);
router.get('/:id',  directorController.show);
module.exports = router