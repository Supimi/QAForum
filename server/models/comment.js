var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  refered_question:  {type:String, required:true},
  refered_answer:  {type:String, required:true},
  comment:  {type:String, required:true},
  user_posted: {type: String},
  date_posted:  {type:Date, default: Date.now, required:true}
});


module.exports = mongoose.model('Comment', CommentSchema);
