var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question_content:  {type:String, required:true},
  tags:  {type:[String], index:true},
  type: {type:String},
  user_posted:{type: String, required:false},
  date_posted:  {type:Date, default: Date.now}
 
});

module.exports = mongoose.model('Question', QuestionSchema);