import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import { addPushNotificationTokenToExpoDetails, subscribeMessage, unsubscribeMessage } from '../controller/expo';

router.post('/add-push-notification-token-to-server', addPushNotificationTokenToExpoDetails);
router.post('/subscribe-message', subscribeMessage);
router.post('/unsubscribe-message', unsubscribeMessage);

expressListRoutes({ prefix: '/api/expo' }, 'EXPO API:', router);

export default router;
