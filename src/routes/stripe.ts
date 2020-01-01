import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as stripeController from '../controller/stripe';

router.get('/get-client-secret', stripeController.getClientSecret);

expressListRoutes({ prefix: '/api/stripe' }, 'STRIPE API:', router);

export default router;
