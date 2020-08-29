import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as expoController from '../controller/expo';

router.post('/add-push-notification-token-to-server', expoController.addPushNotificationTokenToExpoDetails);
router.post('/subscribe-message', expoController.subscribeMessage);
router.post('/unsubscribe-message', expoController.unsubscribeMessage);

expressListRoutes({ prefix: '/api/expo' }, 'EXPO API:', router);

export default router;
