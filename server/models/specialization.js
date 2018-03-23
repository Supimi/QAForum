var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecializationSchema = new Schema({
  module_code:  {type:String, required:true},
  module_name:  {type:String},
  semester: {type:String},
  stream:{type: String, required:false},
 
});

module.exports = mongoose.model('Specialization', SpecializationSchema);
