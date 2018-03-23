var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  refered_question:  {type:String, required:true},
  answer_content:  {type:String, required:true},
  user_posted: {type: String, required:true},
  date_posted:  {type:Date, default: Date.now},
  ratings:{type:Number,  required:true }
});


module.exports = mongoose.model('Answer', AnswerSchema);