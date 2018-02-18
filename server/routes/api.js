var User =require('../models/user');
var Story = require('../models/story');
var Question = require('../models/question');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {
  var token = jsonwebtoken.sign({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      usertype: user.usertype,
      email: user.email
    }, secretKey);
  return token;
}

module.exports = function (app,express) {
  var api = express.Router();

  api.post('/signup', function (req,res) {
    var user = new User({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      username: req.body.username,
      usertype: req.body.usertype,
      email:req.body.email,
      password: req.body.password
    });

    user.save(function (err){
      if(err){
        res.send(err);
        return;
      }else{
        var token = createToken(user)
        res.json({
          success:true,
          message: 'User has been created',
          token: token
        });
      }
    });
  });

  api.get('/users',function (req,res) {

    User.find({}, function (err,users) {
      if(err){
        res.send(err);
        return;
      }

      res.json(users);
    });
  });


  api.post('/login',function (req,res) {
    User.findOne({
      email: req.body.email
    }).select('password').exec(function (err, user) {
      if(err) throw err;

      if(!user){
        res.send({
          success: false,
          message: "User doesn't exist."
        });
      }else if(user){
        var validPassword = user.comparePassword(req.body.password);

        if(!validPassword){
          res.send({
            success: false,
            message: 'Invalied Password'
          })
        }else{
          //create a token
          var token = createToken(user);

          res.json({
            success: true,
            message: 'successfully login!',
            token: token
          });
        }
      }
    });

  });


  api.post('/userdetails',function (req,res) {
    User.findOne({
      email: req.body.email
    }).exec(function (err, userdetails) {
      if(err) {
        console.log('cannot get user details');
        throw err;
      }

      if(!userdetails){
        res.send({
          success: false,
          message: "User doesn't exist."
        });
      }else if(userdetails){
        res.json(userdetails);
      }
    });
  });

  



//middlewere
  api.use(function (req, res, next) {
    console.log('Somebody just came to app!');

    var token = req.body.token || req.headers['x-access-token'];

    //check if token exist
    if(token) {

      jsonwebtoken.verify(token, secretKey, function (err, decoded) {
        if (err) {
          res.status(403).send({success: false, message: 'False to authenticate user'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }else{
      res.status(403).send({ success: false, message: "No Token Provided"});
    }
  });

  api.route('/')
    .post(function (req,res) {
      var story = new Story({
        creator: req.decoded.id,
        content: req.body.content
      });

      story.save(function (err) {
        if(err){
          res.send(err);
          return
        }
        res.json({message:"New Story Created!"})
      });

    })

    .get(function (req,res) {
      Story.find({creator: req.decoded.id},function(err,stories){
        if(err){
          res.send(err);
          return;
        }
        res.json(stories);
      });
    });

  api.post('/me',function (req,res) {
      res.json(req.decoded)

  });


  api.post('/addquestion',function (req,res) {
    var question = new Question({
      question_content:req.body.question_content,
      tags:req.body.tags,
      type: req.body.type,
      user_posted:req.body.id,
      date_posted:new Date()
    });

    question.save(function (err){
      if(err){
        res.send(err);
        return;
      }else{
        res.json({
          success:true,
          message: 'Successfully posted',
        });
      }
    });

  });

  
  api.post('/questions',function (req,res) {
    Question.find({ }).exec(function (err, questions) {
      if(err) {
        console.log('questions cant be fetched');
        res.send({
          success: false,
          message: "error when accessing the questions"
        });
      }

      if(!questions){
        res.send({
          success: false,
          message: "questions does not exists."
        });
      }else if(questions){
        res.json(questions);
      }
    });
  });

  api.post('/findquestion',function (req,res) {
    Question.findOne({
      type: req.body.type
    }).exec(function (err, result) {
      if(err) {
        console.log('error in accesing DB');
        res.send({
          success: false,
          message: "error"
        });
      }

      if(!results){
        res.send({
          success: false,
          message: "Question doesn't exist."
        });
      }else if(results){
        res.json(results);
      }
    });
  });



 



  


  return api;
  }
