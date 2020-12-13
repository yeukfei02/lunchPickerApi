import mongoose from 'mongoose';
import moment from 'moment';
import momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const firebaseDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  current_token: { type: String, required: false },
  refreshed_token: { type: String, required: false },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const firebaseDetailsModel = mongoose.model('FirebaseDetails', firebaseDetailsSchema);

export default firebaseDetailsModel;
