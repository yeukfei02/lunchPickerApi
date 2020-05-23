import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as userController from '../controller/user';

router.post('/signup', userController.signup);
router.post('/login', userController.login);

expressListRoutes({ prefix: '/api/user' }, 'USER API:', router);

export default router;
