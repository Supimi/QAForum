var Admin_Notification = require('../models/admin_notification');

function addUserRequest(req, res) {
    var admin_notification = new Admin_Notification({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        usertype: req.body.usertype,
        email: req.body.email,
        specialization: req.body.specialization,
        index: req.body.index,
        position: req.body.position,
        working_place: req.body.working_place,
        status: req.body.status,
        date: new Date()
    });

    admin_notification.save(function (err) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.json({
                success: true,
                message: 'User request has been recorded'
            });
        }
    });
}

//get all notifications from the admin notification collection with the limit of 30
function getAdminNotifications(req, res) {
    Admin_Notification.find({
        status: false
    }).sort({ date: -1 }).limit(30).exec(function (err, notifications) {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            res.json(notifications);
        }
    });
}



module.exports = { addUserRequest, getAdminNotifications };