import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import {
  addTokenToFirebaseDetails,
  sendMessage,
  sendMultiMessage,
  sendTopicMessage,
  subscribeTopic,
  unsubscribeTopic,
} from '../controller/firebase';

router.post('/add-token-to-server', addTokenToFirebaseDetails);
router.post('/send-message', sendMessage);
router.post('/send-multi-message', sendMultiMessage);
router.post('/send-topic-message', sendTopicMessage);
router.post('/subscribe-topic', subscribeTopic);
router.post('/unsubscribe-topic', unsubscribeTopic);

expressListRoutes({ prefix: '/api/firebase' }, 'FIREBASE API:', router);

export default router;
