import mongoose from 'mongoose';

const restaurantDetailsReviewSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, required: true },
    url: { type: String, required: false },
    text: { type: String, required: false },
    rating: { type: Number, required: false },
    time_created: { type: String, required: false },
    user: { type: mongoose.Schema.Types.Mixed, required: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

restaurantDetailsReviewSchema.set('toJSON', {
  virtuals: true,
});

const restaurantDetailsReviewModel = mongoose.model('RestaurantDetailsReview', restaurantDetailsReviewSchema);

export default restaurantDetailsReviewModel;
