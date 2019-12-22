const mongoose = require('mongoose');

const restaurantDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, required: true },
  alias: { type: String, required: true },
  name: { type: String, required: true },
  image_url: { type: String, required: false },
  is_claimed: { type: Boolean, required: false },
  is_closed: { type: Boolean, required: false },
  url: { type: String, required: false },
  phone: { type: String, required: false },
  display_phone: { type: String, required: false },
  review_count: { type: Number, required: false },
  categories: { type: [mongoose.Schema.Types.Mixed], required: false },
  rating: { type: Number, required: false },
  location: { type: mongoose.Schema.Types.Mixed, required: true },
  coordinates: { type: mongoose.Schema.Types.Mixed, required: false },
  photos: { type: [String], required: false },
  price: { type: String, required: false },
  hours: { type: [mongoose.Schema.Types.Mixed], required: false },
  transactions: { type: [mongoose.Schema.Types.Mixed], required: false },
});

restaurantDetailsSchema.set('timestamps', true);

const restaurantDetailsModel = mongoose.model('RestaurantDetails', restaurantDetailsSchema);

module.exports = restaurantDetailsModel;
