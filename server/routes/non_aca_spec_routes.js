var Non_aca_Specilization = require('../models/non_aca_specilization');

//add new non academic specilization to the database
function addNonAcaSpec(req, res) {
    non_aca_Specilization = new Non_aca_Specilization({
        name_spec: req.body.spec,
        users: []
    });

    non_aca_Specilization.save(function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                success: true,
                message: 'New non academic specilization is added'
            })
        }
    });
}

//update the non academic specilizations with users
function updateNonAcaSpec(req, res) {
    Non_aca_Specilization.update(
        { name_spec: req.body.spec },
        {
            $addToSet: {
                users: req.params.email
            }
        }, function (err, user) {
            if (err) {
                console.log("Error when adding new user to the non academic specilization");
                res.send(err);
            }
            else {
                res.json(user);
            }
        });
}

//get users with non_academic specialization

function getSpecializedUsers(req,res){
    Non_aca_Specilization.findOne({
        name_spec:req.body.non_spec
    }).select('users').exec(function (err, useremails) {
        if (err) {
            console.log('cannot get useremails');
            throw err;
        }
        if (!useremails) {
            res.send({
                success: false,
                message: "Users doesn't exist."
            });
        } else if (useremails) {
            res.json(useremails);
        }
    });
}

module.exports = { addNonAcaSpec, updateNonAcaSpec,getSpecializedUsers }