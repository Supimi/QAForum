var Question = require('../models/question');

//post a question 
function postquestion(req, res) {
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

}

//retrieve the all questions from question collection
function getquestions(req, res) {
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
}

//find one question based on its id
function getquestion(req, res) {
  Question.findOne({
    _id: require('mongodb').ObjectId(req.params.id)
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
}

//update aquestion in the database
function updatequestion(req, res) {
  Question.findByIdAndUpdate(req.params.id,
    { $set: { question_content: req.body.question_content } },
    { new: true }, function (err, ques) {
      if (err) return handleError(err);
      res.send(ques);
    }
  )
}

//delete a question from the database
function deletequestion(req, res) {
  Question.findByIdAndRemove(req.params.id, function (err, ques) {
    // handle any potential errors:
    if (err) {
      res.status(500).send(err);
    } else {
      const response = {
        message: "Question successfully deleted",
        id: req.params.id
      };
      res.status(200).send(response);

    }
  })
}

function getuserquestions(req, res) {
  Question.findOne({
    user_posted: req.query.user_posted
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
}

function searhQuestions(req, res) {
  if (typeof req.body.text !== 'string') {
    return res.status(400);
  }
  var arry = req.body.text.split(" ");

  Question.find({
    $or: [{ tags: { $in: arry } },
    { type: { $in: arry } },
    { type: req.body.text },
    { question_content: { $regex: '.*' + (req.body.text).split(".")[0] + '.*' } }
    ]
  }).exec(function (err, results) {
    if (err) {
      console.log("Error" + err);
    }
    else {
      res.json(results);
    }
  });
}



module.exports = { postquestion, getquestions, getquestion, updatequestion, deletequestion, getuserquestions,searhQuestions };