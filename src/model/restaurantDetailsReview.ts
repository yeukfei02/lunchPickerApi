import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const restaurantDetailsReviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, required: true },
  url: { type: String, required: false },
  text: { type: String, required: false },
  rating: { type: Number, required: false },
  time_created: { type: String, required: false },
  user: { type: mongoose.Schema.Types.Mixed, required: false },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone }
});

const restaurantDetailsReviewModel = mongoose.model('RestaurantDetailsReview', restaurantDetailsReviewSchema);

export default restaurantDetailsReviewModel;
