var Admin_Notification = require('../models/admin_notification');

function addUserRequest(req, res) {
    var admin_notification = new Admin_Notification({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        usertype: req.body.usertype,
        email: req.body.email,
        position: req.body.position,
        status: false,
        viewstatus: false,
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

function updateNotificationStatus(req, res) {
    Admin_Notification.findByIdAndUpdate(
        req.body.id,
        {
            $set: {
                status: true
            }
        }, { new: true }, function (err, request) {
            if (err) return handleError(err);
            res.send(request.status);
        }
    );
}

function updateViewStatus(req, res) {
    Admin_Notification.findByIdAndUpdate(
        req.body.id,
        {
            $set: {
                viewstatus: true
            }
        }, { new: true }, function (err, viewstatus) {
            if (err) return handleError(err);
            res.send(viewstatus);
        }
    );
}



module.exports = { addUserRequest, getAdminNotifications, updateNotificationStatus, updateViewStatus };