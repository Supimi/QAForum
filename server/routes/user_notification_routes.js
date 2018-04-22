var User_notification = require('../models/user_notification');

//add new user notifications
function addUserNotification(req, res) {
    var users=[];
    if(typeof req.body.users == 'string'){
        users.push(req.body.users);
    }
    else{
        users= req.body.users;
    }

    user_notification = new User_notification({
        date: new Date(),
        message: req.body.message,
        refered_ques: req.body.ref_question,
        users: req.body.users,
        status: false
    });

    user_notification.save(function (err, u_notification) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                success: true,
                message: 'New user notification added'
            })
        }
    });
}

//retrieve user notifications of a one user
function getUserNotifications(req, res) {
    User_notification.find({
      users: req.params.user
    },{message:1,date:1}).sort({date:-1}).exec(function (err, u_notification) {
      if (err) {
        console.log('Error in retrieving notifications from the users collection');
        res.send(err);
      }
      res.json(u_notification);
    });
  }

module.exports = { addUserNotification,getUserNotifications };
