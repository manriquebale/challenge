import { Router } from 'express';
import * as authController from './auth.controller'

const router = Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);

module.exports = router