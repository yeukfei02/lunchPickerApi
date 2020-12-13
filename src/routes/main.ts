import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import { getMain } from '../controller/main';

router.get('', getMain);

expressListRoutes({ prefix: '/' }, 'MAIN API:', router);

export default router;
