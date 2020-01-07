import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const favouritesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  current_token: { type: String, ref: 'firebaseDetails', required: true },
  item: { type: mongoose.Schema.Types.Mixed, required: true },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone }
});

const favouritesModel = mongoose.model('Favourites', favouritesSchema);

export default favouritesModel;
