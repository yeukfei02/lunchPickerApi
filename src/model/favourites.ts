import mongoose from 'mongoose';
import moment from 'moment';
import momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const favouritesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ip: { type: String, required: true },
  item: { type: mongoose.Schema.Types.Mixed, required: true },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

favouritesSchema.set('toJSON', {
  virtuals: true,
});

const favouritesModel = mongoose.model('Favourites', favouritesSchema);

export default favouritesModel;
