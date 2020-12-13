import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import requestIp from 'request-ip';
import * as Sentry from '@sentry/node';

import env from 'dotenv';
env.config();

import { log } from './common/common';
import { connectDB } from './db/db';

import mainRoutes from './routes/main';
import userRoutes from './routes/user';
import restaurantRoutes from './routes/restaurant';
import categoryRoutes from './routes/category';
import favouritesRoutes from './routes/favourites';
import firebaseRoutes from './routes/firebase';
import expoRoutes from './routes/expo';
import stripeRoutes from './routes/stripe';

import { cronStart } from './cron/cron';

const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);

// sentry
Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(requestIp.mw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Sentry.Handlers.errorHandler());

app.use('/', mainRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/firebase', firebaseRoutes);
app.use('/api/expo', expoRoutes);
app.use('/api/stripe', stripeRoutes);

connectDB(app);

// cron job
cronStart();

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => {
  log(`server is running at port`, `${port}`);
});
