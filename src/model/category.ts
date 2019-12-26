import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const categorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  alias: { type: String, required: true },
  title: { type: String, required: true },
  parent_aliases: { type: [String], required: false },
  country_whitelist: { type: [String], required: false },
  country_blacklist: { type: [String], required: false },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone }
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
