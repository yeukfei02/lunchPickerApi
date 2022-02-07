import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import requestIp from 'request-ip';
import rateLimit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
require('newrelic');

import env from 'dotenv';
env.config();

import mainRoutes from './routes/main';
import userRoutes from './routes/user';
import restaurantRoutes from './routes/restaurant';
import categoryRoutes from './routes/category';
import favouritesRoutes from './routes/favourites';
import firebaseRoutes from './routes/firebase';
import expoRoutes from './routes/expo';
import stripeRoutes from './routes/stripe';
import reactAdminRoutes from './routes/reactAdmin';

import { connectDB } from './db/db';
import { cronStart } from './cron/cron';

const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);

// sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({
      // to trace all requests to the default router
      app,
      // alternatively, you can specify the routes you want to trace:
      // router: someRouter,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// rate limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10000, // Limit each IP to 10000 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
app.use(Sentry.Handlers.tracingHandler());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(requestIp.mw());
app.use(express.json());
app.use(limiter);

app.use('/', mainRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/firebase', firebaseRoutes);
app.use('/api/expo', expoRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/react-admin', reactAdminRoutes);
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

// db
connectDB(app);

// cron job
cronStart();

// error handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
