const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

});

restaurantSchema.set('timestamps', true);

const restaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = restaurantModel;
