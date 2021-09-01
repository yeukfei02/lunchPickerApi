import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    alias: { type: String, required: true },
    title: { type: String, required: true },
    parent_aliases: { type: [String], required: false },
    country_whitelist: { type: [String], required: false },
    country_blacklist: { type: [String], required: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

categorySchema.set('toJSON', {
  virtuals: true,
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
