import mongoose from 'mongoose';

const favouritesSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    ip: { type: String, required: true },
    item: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

favouritesSchema.set('toJSON', {
  virtuals: true,
});

const favouritesModel = mongoose.model('Favourites', favouritesSchema);

export default favouritesModel;
