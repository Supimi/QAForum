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

    user.save(function (err) {
        if (err) {
            res.send(err);
            return;
        } else {
            var token = createToken(user);
            res.json({
                success: true,
                message: 'User has been created',
                token: token
            });
        }
    });
}

//check user type and password based on email
function checkuser(req, res) {
    User.findOne({
        email: req.body.email
    }, {
            usertype: 1, password: 1
        }).exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({
                    success: false,
                    message: "User doesn't exist."
                });
            } else if (user) {
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
                        usertype: user.usertype
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
                username: req.body.username,
                specialization: searchArray(req.body.specialization),
                position: req.body.position,
                working_place: req.body.working_place
            }
        }, { new: true }, function (err, modifieduser) {
            if (err) return handleError(err);
            res.send(modifieduser);
        });
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

module.exports = { adduser, checkuser, getUsers, getUser, updateUser, deleteUser, getUsername1, getUsername2 };



