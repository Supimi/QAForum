var Rating = require('../models/rating');

function addRating(req, res) {
    var rating = new Rating({
        referred_answer: req.body.ans_id,
        user_id: req.body.user_id,
        rating_level: req.body.rating_level,
    });

    rating.save(function (err, rating) {
        if (err) {
            res.send(err);
        } else {
            res.json(rating.rating_level);
        }
    });

}

function updateRating(req, res) {
    console.log(req.body.ans_id, req.body.userid);
    Rating.findOneAndUpdate(
        {
            referred_answer: req.body.ans_id,
            user_id: req.body.userid
        }, {
            $set: {
                rating_level: req.body.rating_level
            }
        }, { new: true }, function (err, rating) {
            if (err) return handleError(err);
            res.send(rating);
        });
}

function getRating(req, res) {
    Rating.findOne({
        referred_answer: req.params.ans_id,
        user_id: req.params.user_id
    }).exec(function (err, rating) {
        if (err) {
            console.log('answers cannot fetch');
            res.send({
                success: false,
                message: "error when accessing the ratings"
            });
        }

        if (!rating) {
            res.send({
                success: true,
                message: "Ratings does not exists.",
                rating: 0
            });
        } else if (rating) {
            res.send(
                {
                    success: true,
                    rating: rating.rating_level
                });
        }
    });
}

module.exports = { addRating, updateRating, getRating };