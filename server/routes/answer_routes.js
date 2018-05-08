var Answer = require('../models/answer');

function addAnswer(req, res) {
    var answer = new Answer({
        refered_question: req.body.ref_question,
        answer_content: req.body.ans_content,
        user_posted: req.body.user,
        date_posted: new Date(),
        total_ratings: 0
    });

    answer.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                success: true,
                message: 'Successfully posted the answer',
            });
        }
    });

}

//retrive answers using referenced question
function getQuestionAnswers(req, res) {
    Answer.find({
        refered_question: req.params.ref_question
    }).sort({total_ratings:-1}).exec(function (err, answers) {
        if (err) {
            console.log('answers cannot fetch');
            res.send({
                success: false,
                message: "error when accessing the answers"
            });
        }

        if (!answers) {
            res.send({
                success: true,
                message: "Answers does not exists."
            });
        } else if (answers) {
            res.json(answers);
        }
    });
}

//update the answer
function updateAnswer(req, res) {
    Answer.findByIdAndUpdate(
        req.params.id, {
            $set: {
                answer_content: req.body.ans_content,
                date_posted: req.body.date_posted
            }
        }, { new: true }, function (err, ans) {
            if (err) return handleError(err);
            res.send(ans);
        });
}


//update ratings of the answer
function updateTotalRatings(req, res) {
    Answer.findByIdAndUpdate(
        req.params.id, {
            $inc: {
                total_ratings: req.body.ratings
            }
        }, { new: true }, function (err, ans) {
            if (err) return handleError(err);
            res.send(ans);
        });
}

//delete all answers relevent to a question
function deleteQuestionAnswers(req, res) {
    Answer.remove({ refered_question: req.params.ref_question }, function (err, ans) {
        if (err) {
            res.status(500).send(err);
        } else {
            const response = {
                message: "answers of refered to question are successfully deleted",
                id: req.params.id
            };
            return res.status(200).send(response);
        }
    });
}
//add a rating object id into 

function deleteAnswer(req, res) {
    Answer.findByIdAndRemove(req.params.id, function (err, ans) {
        if (err) {
            res.status(500).send(err);
        } else {
            const response = {
                message: "answer successfully deleted",
                id: req.params.id
            };
            return res.status(200).send(response);
        }
    });
}
module.exports = { addAnswer, getQuestionAnswers, updateAnswer, updateTotalRatings, deleteQuestionAnswers, deleteAnswer };