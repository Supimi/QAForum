var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  firstname:  {type:String, required:true},
  lastname:  {type:String, required:true},
  username: {type: String, required: true, index:{unique:true}},
  usertype:  {type:String, required:true},
  email:  {type:String, required:true,unique:true},
  password: {type:String, required:true, select:false},
  index:{type:String, required: false},
  specialization:{type:[String], required: false},
  non_aca_specialization:{type:[String], required: false},
  position:{type:String, required: false},
  working_place:{type:String, required: false},
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
