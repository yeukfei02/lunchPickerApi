import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import { creditCardPayment } from '../controller/stripe';

router.post('/credit-card-payment', creditCardPayment);

expressListRoutes({ prefix: '/api/stripe' }, 'STRIPE API:', router);

export default router;
