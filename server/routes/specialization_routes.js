var Specialization = require('../models/specialization');

//add new specilization to the dattabase
function addSpecilization(req, res) {
    specialization = new Specialization({
        module_code: req.body.module_code,
        module_name: req.body.module_name,
        semester: req.body.semester,
        stream: req.body.stream
    });
    specialization.save(function (err) {
        if (err) {
            console.log("Error in storing specilizations");
            res.send(err);
        } else {
            res.json({
                success: true,
                message: 'New specilization added to the system'
            });
        }
    })
}

//get all specilizations
function getSpecilizations(req, res) {
    Specialization.find({}).sort({ semester: 1 }).exec(function (err, spec) {
        if (err) {
            console.log("Error in retrieving specilizations");
            res.send(err);
        }
        else {
            res.json(spec);
        }
    });
}

//get details of one specilization
function getSpecilization(req, res) {
    Specialization.findOne({
        module_code: req.params.module_code
    }).exec(function (err, spec) {
        if (err) {
            console.log("Specialization does not exits or error in accessing DB");
            res.send(err);
        } else {
            res.json(spec);
        }
    });
}

function deleteSpecialization(req, res) {
    Specialization.findByIdAndRemove(req.query.id, function (err, spec) {
        if (err) {
            res.status(500).send(err);
        } else {
            const response = {
                message: "Specilization successfully deleted",
                id: req.query.id
            };
            return res.status(200).send(response);
        }
    });
}

module.exports = { addSpecilization, getSpecilizations, getSpecilization, deleteSpecialization };