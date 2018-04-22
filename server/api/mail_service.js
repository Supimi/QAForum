var nodemailer = require("nodemailer");
var sgTransport = require('nodemailer-sendgrid-transport');
var mailconfig = require('./mailconfig.js');


function sendmail_opt(req, res) {
    console.log("from nodemailer");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailconfig.username,
            pass: mailconfig.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'supimi.15@cse.mrt.ac.lk',
        to: 'supimipiumika@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy! Pissu hutan'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({
                success: false,
                message: 'Error while sending email'
            });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                success: true,
                message: 'Email sent'
            });
        }
    });

}

function send_emails(req, res) {
    console.log("from sendgrid");

    var options = {
      auth: {
        api_key: mailconfig.api_key
      }
    };

    var transporter = nodemailer.createTransport(sgTransport(options));

    var email = {
      to: req.body.email,
      from: 'innovineqsolver@gmail.com',
      subject: req.body.subject,
      text: req.body.message,
      html: '<b>'+req.body.message+'</b>'
    };

    transporter.sendMail(email, function (err, info) {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: 'Error while sending email'
        });
      }
      else {
        console.log(info);
        res.json({
          success: true,
          message: 'Email sent'
        });
      }

    });

  }

module.exports = { sendmail_opt ,send_emails}