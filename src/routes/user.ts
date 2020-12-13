import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import { signup, login, getAllUser } from '../controller/user';

router.post('/signup', signup);
router.post('/login', login);
router.get('', getAllUser);

expressListRoutes({ prefix: '/api/user' }, 'USER API:', router);

export default router;
