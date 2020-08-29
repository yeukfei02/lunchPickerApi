import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const expoDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  push_notification_token: { type: String, required: false },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const expoDetailsModel = mongoose.model('ExpoDetails', expoDetailsSchema);

export default expoDetailsModel;
