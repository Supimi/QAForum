var User = require('../models/user');
var Question = require('../models/question');
var Answer = require('../models/answer');
var Admin_Notification = require('../models/admin_notification');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var sgTransport = require('nodemailer-sendgrid-transport');

//create text indexes for questions
var createHashedIndex = function (db, callback) {
  // Get the users collection
  var collection = db.collection('questions');
  // Create the index
  collection.createIndex(
    { tags: "text", question_content: "text" }, function (err, result) {
      console.log(result);
      callback(result);
    });
};


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

module.exports = function (app, express) {
  var api = express.Router();

  api.post('/signup', function (req, res) {
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
        var token = createToken(user)
        res.json({
          success: true,
          message: 'User has been created',
          token: token
        });
      }
    });
  });


  api.post('/addUserRequest', function (req, res) {
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
      status: req.body.status
    });

    admin_notification.save(function (err) {
      if (err) {
        res.send(err);
        return;
      } else {
        res.json({
          success: true,
          message: 'User request has been recorded',
        });
      }
    });
  });

  api.get('/users', function (req, res) {

    User.find({}, function (err, users) {
      if (err) {
        res.send(err);
        return;
      }

      res.json(users);
    });
  });


  api.post('/login', function (req, res) {
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

  });


  api.post('/userdetails', function (req, res) {
    User.findOne({
      email: req.body.email
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
  });





  //middlewere
  api.use(function (req, res, next) {
    console.log('Somebody just came to app!');

    var token = req.body.token || req.headers['x-access-token'];

    //check if token exist
    if (token) {

      jsonwebtoken.verify(token, secretKey, function (err, decoded) {
        if (err) {
          res.status(403).send({ success: false, message: 'False to authenticate user' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({ success: false, message: "No Token Provided" });
    }
  });

  api.route('/')
    .post(function (req, res) {
      var story = new Story({
        creator: req.decoded.id,
        content: req.body.content
      });

      story.save(function (err) {
        if (err) {
          res.send(err);
          return
        }
        res.json({ message: "New Story Created!" })
      });

    })

    .get(function (req, res) {
      Story.find({ creator: req.decoded.id }, function (err, stories) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(stories);
      });
    });

  api.post('/me', function (req, res) {
    res.json(req.decoded)

  });


  api.post('/addquestion', function (req, res) {
    var question = new Question({
      question_content: req.body.question_content,
      tags: req.body.tags,
      type: req.body.type,
      user_posted: req.body.user_posted,
      date_posted: new Date()
    });

    question.save(function (err) {
      if (err) {
        res.send(err);
        return;
      } else {
        res.json({
          success: true,
          message: 'Successfully posted',
        });
      }
    });

  });


  //Post answer
  api.post('/addAnswer', function (req, res) {
    var answer = new Answer({
      refered_question: req.body.ref_question,
      answer_content: req.body.ans_content,
      user_posted: req.body.user,
      date_posted: new Date(),
      ratings: 0
    });

    answer.save(function (err) {
      if (err) {
        res.send(err);
        return;
      } else {
        res.json({
          success: true,
          message: 'Successfully posted the answer',
        });
      }
    });

  });


  api.post('/questions', function (req, res) {
    Question.find({}).sort({ date_posted: -1 }).exec(function (err, questions) {
      if (err) {
        console.log('questions cant be fetched');
        res.send({
          success: false,
          message: "error when accessing the questions"
        });
      }

      if (!questions) {
        res.send({
          success: false,
          message: "questions does not exists."
        });
      } else if (questions) {
        res.json(questions);
      }
    });
  });

  api.post('/findquestion', function (req, res) {
    Question.findOne({
      _id: require('mongodb').ObjectId(req.body.id)
    }).exec(function (err, result) {
      if (err) {
        console.log('error in accesing DB');
        res.send({
          success: false,
          message: "error"
        });
      }

      if (!result) {
        res.send({
          success: false,
          message: "Question doesn't exist."
        });
      } else if (result) {
        console.log('question details sent');
        res.json(result);
      }
    });
  });


  api.post('/finduserquestions', function (req, res) {
    Question.findOne({
      user_posted: req.body.user_posted
    }).sort({ date_posted: -1 }).exec(function (err, result) {
      if (err) {
        console.log('error in accesing DB');
        res.send({
          success: false,
          message: "error"
        });
      }

      if (result == null) {
        res.send({
          success: false,
          message: "Question doesn't exist."
        });
      } else if (result) {
        res.json(result);
      }
    });
  });




  api.post('/getusername', function (req, res) {
    User.findOne({
      _id: require('mongodb').ObjectId(req.body.id)
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
  });

  api.post('/getusernamebyemail', function (req, res) {
    User.findOne({
      email: req.body.email
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
  });

  api.post('/keysearch', function (req, res) {
    Question.find({
      "$text": { " $search": req.body.key }
    });
  });


  api.post('/answers', function (req, res) {
    Answer.find({
      refered_question: req.body.ref_question
    }).exec(function (err, answers) {
      if (err) {
        console.log('answers cannot fetch');
        res.send({
          success: false,
          message: "error when accessing the answers"
        });
      }

      if (!answers) {
        res.send({
          success: false,
          message: "Answers does not exists."
        });
      } else if (answers) {
        res.json(answers);
      }
    });
  });

  api.get('/nodemailer', function (req, res) {
    console.log("from nodemailer");
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'supimi.15@cse.mrt.ac.lk',
        pass: 'spG1@mora'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: 'supimi.15@cse.mrt.ac.lk',
      to: 'supimipiumika@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy! Pissu hutan'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          message: 'Error while sending email',
        });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({
          success: true,
          message: 'Email sent',
        });
      }
    });

  });

  api.get('/sendgrid', function (req, res) {
    console.log("from sendgrid");
    var transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'supimip',
        pass: '1995supimi'
      },
    });

    var options = {
      auth: {
        api_key: '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'
      }
    }

    var transporter = nodemailer.createTransport(sgTransport(options));

    var email = {
      to: ['supimipiumika@gmail.com', 'supimigamage@gmail.com'],
      from: 'innovineqsolver@gmail.com',
      subject: 'QSolver',
      text: 'Login to your account using following password',
      html:'<b>Login to your account using following password</b>'
    };

    transporter.sendMail(email, function (err, info) {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: 'Error while sending email',
        });
      }
      else {
        console.log(info);
        res.json({
          success: true,
          message: 'Email sent',
        });
      }

    });

  });












  return api;
}
