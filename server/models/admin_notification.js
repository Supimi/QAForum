var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminNotificationSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, index: { unique: true } },
  usertype: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: false },
  status: { type: Boolean, required: true },
  viewstatus:{ type: Boolean, required: true },
  date:  {type:Date,  default: Date.now},
});

module.exports = mongoose.model('Admin_notification', AdminNotificationSchema);

