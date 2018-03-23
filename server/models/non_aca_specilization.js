var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NonAcaSpecilizationSchema = new Schema({
  name_spec:  {type:String, required:true},
  users:  {type:[String]},
 
});

module.exports = mongoose.model('NonAcaSpecilization', NonAcaSpecilizationSchema);
