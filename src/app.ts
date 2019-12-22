import * as express from 'express';
const app = express();

import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as mongoose from 'mongoose';

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

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use('/api/restaurant', restaurantRoutes);
app.use('/api/category', categoryRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found'
  });
});

export default app;
