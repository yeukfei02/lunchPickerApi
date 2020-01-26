import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const userConnectionDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ip: { type: String, required: false },
  os: { type: mongoose.Schema.Types.Mixed, required: false },
  client: { type: mongoose.Schema.Types.Mixed, required: false },
  device: { type: mongoose.Schema.Types.Mixed, required: false },
  routeName: { type: String, required: false },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const userConnectionDetailsModel = mongoose.model('UserConnectionDetails', userConnectionDetailsSchema);

export default userConnectionDetailsModel;
