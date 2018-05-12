var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecializationSchema = new Schema({
  module_code: { type: String, required: true, index: { unique: true } },
  module_name: { type: String, required: true },
  semester: { type: Number, required: true },
  stream: { type: String, required: true },
  tag: { type: String, required: true }

});

module.exports = mongoose.model('Specialization', SpecializationSchema);
