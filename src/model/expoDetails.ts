import mongoose from 'mongoose';

const expoDetailsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    push_notification_token: { type: String, required: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

expoDetailsSchema.set('toJSON', {
  virtuals: true,
});

const expoDetailsModel = mongoose.model('ExpoDetails', expoDetailsSchema);

export default expoDetailsModel;
