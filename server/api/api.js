var user_routes = require('../routes/user_routes');
var question_routes = require('../routes/question_routes');
var answer_routes = require('../routes/answer_routes');
var admin_notification_routes = require('../routes/admin_notification_routes');
var comment_routes = require('../routes/comment_routes');
var specialization_routes = require('../routes/specialization_routes');
var user_notification_routes = require('../routes/user_notification_routes');
var non_aca_specilization_routes = require('../routes/non_aca_spec_routes');
var Non_aca_Specilization = require('../models/non_aca_specilization');
var config = require('../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');
var mailservice = require('./mail_service');


module.exports = function (app, express) {
  var api = express.Router();

  api.post('/user/signup', user_routes.adduser);

  api.post('/user/login', user_routes.checkuser);

  //save the user requests
  api.post('/adminNotification', admin_notification_routes.addUserRequest);

  //retrive all users from the user collection
  api.get('/user', user_routes.getUsers);

  //retrive the details of one user
  api.get('/user/:email', user_routes.getUser);


  //***************************MIDDLEWARE************************************* */
  api.use(function (req, res, next) {
    console.log('Somebody just came to app!');

    var token = req.body.token || req.headers['x-access-token'] || req.params.token||req.query.token;

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

  //******************************************************************************** */

  //update the details of the user
  api.put('/user/:email', user_routes.updateUser);

  //delete a user from the system - only for admin
  api.delete('/user/:email', user_routes.deleteUser);

  api.post('/question', question_routes.postquestion);


  //Post answer
  api.post('/answer', answer_routes.addAnswer);


  //retrieve the all questions from question collection
  api.get('/question', question_routes.getquestions);

  //retrive one question based on _id
  api.get('/question/:id', question_routes.getquestion);

  //update the question content
  api.put('/question/:id', question_routes.updatequestion);

  //delete a question
  api.delete('/question/:id', question_routes.deletequestion);


  //get the questions posted by special user
  api.get('/question/userquestions', question_routes.getuserquestions);


  //get username of the
  api.get('/user/username/:id', user_routes.getUsername1());

  //get username based on email
  api.get('/user/usernamebyemail/:email', user_routes.getUsername2);

  //get the all answers of a question
  api.get('/answer/:ref_question', answer_routes.getQuestionAnswers);

  //update answer
  api.put('/answer/:ref_question/:id', answer_routes.updateAnswer);

  //update ratings
  api.put('/answer/:ref_question/:id/ratings', answer_routes.updateRatings);

  //delete all answers refered to one question
  api.delete('/answer/:ref_question', answer_routes.deleteQuestionAnswers);

  //find specific answer by its id and remove from the answer collection
  api.delete('/answer/:ref_question/:id', answer_routes.deleteAnswer);

  //send mals using node mailer
  api.get('/adminNotification/nodemailer', mailservice.sendmail_opt);

  //send mails using nodemailer + sendgrid
  api.get('/adminNotification/sendgrid', mailservice.send_emails);


  //get most recent 30 admin notifications
  api.get('/adminNotification', admin_notification_routes.getAdminNotifications);


  //search questions using question tags, question type and question content
  api.post('/question/qsearch', question_routes.searhQuestions);

  //add new comment
  api.post('/comment', comment_routes.addComment);

  //get the comments relevent to an answer of a question
  api.get('/comment', comment_routes.getAnswerComments);

  //update a comment
  api.put('/comment/:id', comment_routes.updateComment);

  //delete a comment
  api.delete('/comment/:id', comment_routes.deleteComment);

  //delete comments which are refered to one answer
  api.delete('/comment/:id/:refered_answer', comment_routes.deleteAnswerComments);

  //delete comments which are refered to one question
  api.delete('/comment/:id/:refered_answer/:ref_question', comment_routes.deleteQuestionComments);

  //add new specilizations
  api.post('/specialization', specialization_routes.addSpecilization);

  //retrieve all specilizations from the database
  api.get('/specialization', specialization_routes.getSpecilizations);

  //get the details of a specific specialization
  api.get('/specialization/:module_code', specialization_routes.getSpecilization);

  //delete a specilization
  api.delete('/specialization/:module_code', specialization_routes.deleteSpecialization);

  //insert user notifications into user_notifications collection
  api.post('/userNotification', user_notification_routes.addUserNotification);

  //retrieve user notifications of one user
  api.get('/userNotification/:user', user_notification_routes.getUserNotifications);

  //add new non-academic specilizations to the system -only by admin
  api.post('/nonAcaSpec',non_aca_specilization_routes.addNonAcaSpec);

  //add users to the non-aca-specili zations
  api.put('/nonAcaSpec/:id', non_aca_specilization_routes.updateNonAcaSpec);

  return api;
};
