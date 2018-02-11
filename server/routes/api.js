var User =require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {
  var token = jsonwebtoken.sign({
      id: user._id,
      name: user.name,
      username: user.username
    }, secretKey);
  return token;
}

module.exports = function (app,express) {
  var api = express.Router();

  api.post('/signup', function (req,res) {
    var user = new User({
      fistname:req.body.firstname,
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
      username: req.body.username
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


//middlewere
  api.use(function (req, res, next) {
    console.log('Somebody just came to app!');

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

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

  api.get('/me',function (req,res) {
      res.json(req.decoded)

  });




  return api;
}
