import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const restaurantSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, required: true },
  alias: { type: String, required: true },
  name: { type: String, required: true },
  image_url: { type: String, required: false },
  is_closed: { type: Boolean, required: false },
  url: { type: String, required: false },
  review_count: { type: Number, required: false },
  categories: { type: [mongoose.Schema.Types.Mixed], required: false },
  rating: { type: Number, required: false },
  coordinates: { type: mongoose.Schema.Types.Mixed, required: false },
  transactions: { type: [mongoose.Schema.Types.Mixed], required: false },
  price: { type: String, required: false },
  location: { type: mongoose.Schema.Types.Mixed, required: true },
  phone: { type: String, required: false },
  display_phone: { type: String, required: false },
  distance: { type: Number, required: false },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const restaurantModel = mongoose.model('Restaurant', restaurantSchema);

export default restaurantModel;
