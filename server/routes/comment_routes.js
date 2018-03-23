var Comment = require('../models/comment');

//add new comment to the collection
function addComment(req, res) {
    var comment = new Comment({
        refered_question: req.body.ref_question,
        refered_answer: req.body.ref_answer,
        comment: req.body.comment,
        user_posted: req.body.user_posted,
        date_posted: new Date()
    });

    comment.save(function (err) {
        if (err) {
            console.log('Error has been occured');
            res.send(err);
        } else {
            res.json({
                success: true,
                message: 'Comment posted'
            });
        }
    });

}

//retrieve comments relevent to an answer of a question
function getAnswerComments(req, res) {
    Comment.find({
        refered_question: req.query.ref_question,
        refered_answer: req.query.ref_answer
    }).sort({ date_posted: -1 }).exec(function (err, comments) {
        if (err) {
            console.log("Error while accessing to the database");
        }
        else {
            console.log(comments);
            res.json(comments);
        }
    });

}


//update a comment in the database
function updateComment(req, res) {
    Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            comment: req.body.comment,
            date_posted: new Date()
        }
    }, { new: true }, function (err, comment) {
        if (err) return handleError(err);
        res.send(comment);
    });
}


//delete a specific comment from the collection
function deleteComment(req, res) {
    Comment.findByIdAndRemove(req.params.id,
        function (err, comment) {
            if (err) {
                res.status(500).send(err);
            } else {
                const response = {
                    message: "Comment successfully deleted",
                    id: req.params.id
                };
                return res.status(200).send(response);
            }
        });
}

//delete all comments of a answer
function deleteAnswerComments(req, res) {
    Comment.remove({ refered_answer: req.params.ref_answer }, function (err, comment) {
        if (err) {
            res.status(500).send(err);
        } else {
            const response = {
                message: "Comments of a answer successfully deleted",
                id: req.params.id
            };
            return res.status(200).send(response);
        }
    });
}

function deleteQuestionComments(req, res) {
    Comment.remove({ refered_question: req.params.ref_question }, function (err, comment) {
        if (err) {
            res.status(500).send(err);
        } else {
            const response = {
                message: "Comments of a answer successfully deleted",
                id: req.params.id
            };
            return res.status(200).send(response);
        }
    });
}

module.exports = { addComment, getAnswerComments, updateComment, deleteComment, deleteAnswerComments, deleteQuestionComments };
