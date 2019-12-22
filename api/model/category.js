const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

});

categorySchema.set('timestamps', true);

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;
