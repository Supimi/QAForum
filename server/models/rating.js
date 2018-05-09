var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
  referred_answer:  {type:String, required:true},
  user_id:{type:String, required:true},
  rating_level:{type:Number, required:true}
});


module.exports = mongoose.model('Rating', RatingSchema);