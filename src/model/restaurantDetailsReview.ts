import * as mongoose from 'mongoose';

const restaurantDetailsReviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, required: true },
  url: { type: String, required: false },
  text: { type: String, required: false },
  rating: { type: Number, required: false },
  time_created: { type: String, required: false },
  user: { type: mongoose.Schema.Types.Mixed, required: false },
  total: { type: Number, required: false },
  possible_languages: { type: [String], required: false },
});

restaurantDetailsReviewSchema.set('timestamps', true);

const restaurantDetailsReviewModel = mongoose.model('RestaurantDetailsReview', restaurantDetailsReviewSchema);

export default restaurantDetailsReviewModel;
