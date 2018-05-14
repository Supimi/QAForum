var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question_content:  {type:String, required:true},
  tags:  {type:[String],required:true, index:true},
  type: {type:String,index:false},
  user_posted:{type: String, required:true},
  anonymous:{type: Boolean, required:true},
  date_posted:  {type:Date, default: Date.now}
 
});

module.exports = mongoose.model('Question', QuestionSchema);
