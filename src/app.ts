import * as express from 'express';
const app = express();

import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import * as requestIp from 'request-ip';
import * as Sentry from '@sentry/node';

import * as env from 'dotenv';
env.config();

// sentry
Sentry.init({ dsn: process.env.SENTRY_DSN });

import mainRoutes from './routes/main';
import userRoutes from './routes/user';
import restaurantRoutes from './routes/restaurant';
import categoryRoutes from './routes/category';
import favouritesRoutes from './routes/favourites';
import firebaseRoutes from './routes/firebase';
import stripeRoutes from './routes/stripe';
import * as cron from './cron/cron';

import { connectDB } from './db/db';
connectDB(app);

app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(requestIp.mw());
app.use(Sentry.Handlers.errorHandler());

app.use('/', mainRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/firebase', firebaseRoutes);
app.use('/api/stripe', stripeRoutes);

// cron job
cron.init();

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

export default app;
