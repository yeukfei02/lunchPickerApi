import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const creditCardDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  token: { type: String, required: true },
  card: { type: mongoose.Schema.Types.Mixed, required: true },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const creditCardDetailsModel = mongoose.model('CreditCardDetails', creditCardDetailsSchema);

export default creditCardDetailsModel;
