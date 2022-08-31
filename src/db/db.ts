import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    // mongo local db
    await mongoose.connect('mongodb://localhost:27017/lunch-picker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    // mongo atlas
    await mongoose.connect(
      `mongodb+srv://lunch-picker-api:${process.env.MONGO_ATLAS_PASSWORD}@lunch-picker-db-21711215.mongo.ondigitalocean.com/lunch-picker-api?tls=true&authSource=admin&replicaSet=lunch-picker-db`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );

    // docker local mongodb
    // await mongoose.connect('mongodb://mongo:27017/lunch-picker', { useNewUrlParser: true, useUnifiedTopology: true });
  }
};
