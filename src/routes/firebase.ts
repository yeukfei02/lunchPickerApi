import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as firebaseController from '../controller/firebase';

router.post('/send-message', firebaseController.sendMessage);
router.post('/send-multi-message', firebaseController.sendMultiMessage);
router.post('/send-topic-message', firebaseController.sendTopicMessage);
router.post('/subscribe-topic', firebaseController.subscribeTopic);
router.post('/unsubscribe-topic', firebaseController.unsubscribeTopic);

expressListRoutes({ prefix: '/api/firebase' }, 'FIREBASE API:', router);

export default router;
