var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserNotificationSchema = new Schema({
    date: { type: Date },
    message: { type: String, required: true },
    refered_ques: { type: String },
    users: { type: [String] },
    status:{ type:Boolean, required:true}

});

module.exports = mongoose.model('UserNotification',UserNotificationSchema);
