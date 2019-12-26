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
import { Timber } from "@timberio/node";

import * as env from 'dotenv';
env.config();

// sentry
Sentry.init({ dsn: process.env.SENTRY_DSN });

// timber
const timber = new Timber(process.env.TIMBER_API_KEY, process.env.TIMBER_SOURCE_ID);
timber.pipe(process.stdout);

import restaurantRoutes from './routes/restaurant';
import categoryRoutes from './routes/category';

const environment = app.get('env');
if (environment === 'development') {
  // mongo local db
  mongoose.connect('mongodb://localhost:27017/lunch-picker', { useNewUrlParser: true, useUnifiedTopology: true });
} else {
  // mongo atlas
  mongoose.connect(`mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@lunch-picker-goksl.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

  // docker local mongodb
  // mongoose.connect('mongodb://mongo:27017/lunch-picker', { useNewUrlParser: true, useUnifiedTopology: true });
}

app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(requestIp.mw());
app.use(Sentry.Handlers.errorHandler());

app.use('/api/restaurant', restaurantRoutes);
app.use('/api/category', categoryRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found'
  });
});

export default app;
