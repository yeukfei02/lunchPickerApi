import mongoose from 'mongoose';

const creditCardDetailsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    token: { type: String, required: true },
    card: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

creditCardDetailsSchema.set('toJSON', {
  virtuals: true,
});

const creditCardDetailsModel = mongoose.model('CreditCardDetails', creditCardDetailsSchema);

export default creditCardDetailsModel;
