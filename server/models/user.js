var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: {type: String, required: true, index:{unique:true}},
  usertype: String,
  email: String,
  password: {type:String, required:true, select:false}
});

UserSchema.pre('save',function (next) {
  var user = this;

  if(!user.isModified('password'))return next();

  bcrypt.hash(user.password, null, null, function (err,hash) {
    if(err) return next(er);

    user.password = hash;
    next();

  });

});

UserSchema.methods.comparePassword = function(password) {
  var user = this;
 //compare the user password with password stored in the database
  return bcrypt.compareSync(password, user.password)
};

module.exports = mongoose.model('User', UserSchema);
