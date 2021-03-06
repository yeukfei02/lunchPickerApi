import { Express } from 'express';
import mongoose from 'mongoose';

export const connectDB = async (app: Express): Promise<void> => {
  const environment = app.get('env');
  if (environment === 'development' || environment === 'test') {
    // mongo local db
    await mongoose.connect('mongodb://localhost:27017/lunch-picker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    // mongo atlas
    await mongoose.connect(
      `mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@lunch-picker-goksl.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );

    // docker local mongodb
    // await mongoose.connect('mongodb://mongo:27017/lunch-picker', { useNewUrlParser: true, useUnifiedTopology: true });
  }
};
