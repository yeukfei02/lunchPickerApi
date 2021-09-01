import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

userSchema.set('toJSON', {
  virtuals: true,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
