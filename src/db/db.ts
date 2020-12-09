import { Express } from 'express';
import * as mongoose from 'mongoose';

export const connectDB = async (app: Express): Promise<void> => {
  const environment = app.get('env');
  if (environment === 'development' || environment === 'test') {
    // mongo local db
    mongoose.connect('mongodb://localhost:27017/lunch-picker', { useNewUrlParser: true, useUnifiedTopology: true });
  } else {
    // mongo atlas
    mongoose.connect(
      `mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@lunch-picker-goksl.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );

    // docker local mongodb
    // mongoose.connect('mongodb://mongo:27017/lunch-picker', { useNewUrlParser: true, useUnifiedTopology: true });
  }
};
