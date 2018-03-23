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
          users: req.params.id
        }
      }, function (err, user) {
        if (err) {
          console.log("Error when adding new user to the non academic specilization");
          res.send(err);
        }
        else {
          res.send(user);
        }
      });
  }

module.exports = { addNonAcaSpec, updateNonAcaSpec }