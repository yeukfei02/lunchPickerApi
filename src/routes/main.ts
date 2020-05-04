import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as mainController from '../controller/main';

router.get('', mainController.getMain);

expressListRoutes({ prefix: '/' }, 'MAIN API:', router);

export default router;
