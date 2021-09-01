import mongoose from 'mongoose';

const firebaseDetailsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    current_token: { type: String, required: false },
    refreshed_token: { type: String, required: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

firebaseDetailsSchema.set('toJSON', {
  virtuals: true,
});

const firebaseDetailsModel = mongoose.model('FirebaseDetails', firebaseDetailsSchema);

export default firebaseDetailsModel;
