import mongoose from 'mongoose';
const userConnectionDetailsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    ip: { type: String, required: false },
    os: { type: mongoose.Schema.Types.Mixed, required: false },
    client: { type: mongoose.Schema.Types.Mixed, required: false },
    device: { type: mongoose.Schema.Types.Mixed, required: false },
    routeName: { type: String, required: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

userConnectionDetailsSchema.set('toJSON', {
  virtuals: true,
});

const userConnectionDetailsModel = mongoose.model('UserConnectionDetails', userConnectionDetailsSchema);

export default userConnectionDetailsModel;
