import * as mongoose from 'mongoose';

const userConnectionDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ip: { type: String, required: false },
  os: { type: mongoose.Schema.Types.Mixed, required: false },
  client: { type: mongoose.Schema.Types.Mixed, required: false },
  device: { type: mongoose.Schema.Types.Mixed, required: false },
});

userConnectionDetailsSchema.set('timestamps', true);

const userConnectionDetailsModel = mongoose.model('UserConnectionDetails', userConnectionDetailsSchema);

export default userConnectionDetailsModel;
