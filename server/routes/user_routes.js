var User = require('../models/user');
var jsonwebtoken = require('jsonwebtoken');
var config = require('../config');
var secretKey = config.secretKey;

//create a token for users
function createToken(user) {
    var token = jsonwebtoken.sign({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        usertype: user.usertype,
        email: user.email
    }, secretKey);
    return token;
}


//add new user to the database
function adduser(req, res) {
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        usertype: req.body.usertype,
        email: req.body.email,
        password: req.body.password,
        specialization: req.body.specialization,
        index: req.body.index,
        position: req.body.position,
        working_place: req.working_place
    });

    user.save(function (err, user) {
        if (err) {
            res.send(err);
            return;
        } else {
            var token = createToken(user);
            res.json({
                success: true,
                message: 'User has been created',
                token: token,
                id: user._id
            });
        }
    });
}

//check user type and password based on email
function checkuser(req, res) {
    User.findOne({
        email: req.body.email
    }, {
            _id: 1, usertype: 1, password: 1, username: 1
        }).exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({
                    success: false,
                    message: "User doesn't exist."
                });
            } else if (user) {
                //console.log(user);
                var validPassword = user.comparePassword(req.body.password);

                if (!validPassword) {
                    res.send({
                        success: false,
                        message: 'Invalied Password'
                    })
                } else {
                    //create a token
                    var token = createToken(user);

                    res.json({
                        success: true,
                        message: 'successfully login!',
                        token: token,
                        id: user._id,
                        usertype: user.usertype,
                        username: user.username
                    });
                }
            }
        });

}

//retrive all users from the user collection
function getUsers(req, res) {

    User.find({}, function (err, users) {
        if (err) {
            res.send(err);
            return;
        }

        res.json(users);
    });
}

//retrieve the user details using user's email
function getUser(req, res) {
    User.findOne({
        //get the parameter value
        email: req.params.email
    }).exec(function (err, userdetails) {
        if (err) {
            console.log('cannot get user details');
            throw err;
        }
        if (!userdetails) {
            res.send({
                success: false,
                message: "User doesn't exist."
            });
        } else if (userdetails) {
            res.json(userdetails);
        }
    });

}

//update the details of the user
function updateUser(req, res) {
    User.findByIdAndUpdate(
        req.body.id,
        {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                $push: { specialization: { $each: req.body.specialization } },
                position: req.body.position,
                working_place: req.body.working_place,
                non_aca_specialization: req.body.non_spec
            }
        }, );
}

//delete a user
function deleteUser(req, res) {
    User.remove({ email: req.params.email }, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            const response = {
                message: "User successfully deleted",
                id: req.query.id
            };
            return res.status(200).send(response);
        }
    });
}

//search users
function searchUsers(req, res) {
    var names = (req.query.searchtxt).split(" ");
    if (names.length == 1) {
        User.find({
            $or: [{ firstname: { $regex: '.*' + (req.query.searchtxt) + '.*', $options: 'i' } },
            { lastname: { $regex: '.*' + (req.query.searchtxt) + '.*', $options: 'i' } },
            { username: { $regex: '.*' + (req.query.searchtxt) + '.*', $options: 'i' } },
            { email: { $regex: '.*' + (req.query.searchtxt) + '.*', $options: 'i' } }
            ]

        }).exec(function (err, results) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            }
            res.json(results);
        });

    } else {
        User.find({
            $or: [{ firstname: { $regex: '.*' + (req.query.searchtxt).split(" ")[0] + '.*', $options: 'i' } },
            { lastname: { $regex: '.*' + (req.query.searchtxt).split(" ")[0] + '.*', $options: 'i' } },
            { username: { $regex: '.*' + (req.query.searchtxt).split(" ")[0] + '.*', $options: 'i' } },
            { email: { $regex: '.*' + (req.query.searchtxt).split(" ")[0] + '.*', $options: 'i' } },
            { firstname: { $in: names } }, { lastname: { $in: names } }, { username: { $in: names } }
            ]

        }).exec(function (err, results) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            }
            res.json(results);
        });
    }
}

function getUserCount(req, res) {
    User.aggregate([
        {
            $group: {
                _id: '$usertype',
                count: { $sum: 1 }
            }
        }
    ], function (err, count) {
        if (err) {
            console.log("Cannot take the user count");
        }
        else {
            res.json(count);
        }
    });

}

//get the username by id
function getUsername1(req, res) {
    User.findOne({
        _id: require('mongodb').ObjectId(req.params.id)
    }).select('username').exec(function (err, username) {
        if (err) {
            console.log('cannot get username');
            throw err;
        }
        if (!username) {
            res.send({
                success: false,
                message: "User doesn't exist."
            });
        } else if (username) {
            res.json(username);
        }
    });
}

//get the username by email
function getUsername2(req, res) {
    User.findOne({
        email: req.params.email
    }).select('username').exec(function (err, username) {
        if (err) {
            console.log('cannot get username');
            throw err;
        }
        if (!username) {
            res.send({
                success: false,
                message: "User doesn't exist."
            });
        } else if (username) {
            res.json(username);
        }
    });
}



module.exports = { adduser, checkuser, getUsers, getUser, updateUser, deleteUser, searchUsers, getUserCount, getUsername1, getUsername2 };



