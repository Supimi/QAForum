//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var User = require('../models/user');
var server = require('../../server/server');
var request = require('request');

//import models
var User = require('../models/user');
var Question = require('../models/question');
var Admin_notification = require('../models/admin_notification');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var assert = require('chai').assert
var expect = require('chai').expect;


var email = "supimi.15@cse.mrt.ac.lk";
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGltaSIsInVzZXJ0eXBlIjoiU3R1ZGVudCIsImlhdCI6MTUyNjE0MjI2M30.Xbe94AqQHG8JEX69iv46_lZw6pd4nkfGwPp4FL8pAdg";

var login_details = {
    'email': 'supimi.15@cse.mrt.ac.lk',
    'password': '123456'
}

var register_details = {
    'firstname': "Dinuka",
    'lastname': "Kavindi",
    'username': "Dinuka",
    'index': "150678C",
    'email': "Dinuka@cse.mrt.ac.lk",
    'password': "123456",
    'usertype': "Student"
};

var admin_request = {
    "firstname": "Dinuka",
    "lastname": "Kavindi",
    "username": "Dinuka",
    'email': "Dinuka@cse.mrt.ac.lk",
    'usertype': "Student",
    "position": "",
    "status": false,
    "viewstatus": false
};

var question = {
    "token": token,
    "question_content": "abcd",
    "tags": [
        "academic"
    ],
    "type": "academic subjects",
    "user_posted": "supimi",
    "anonymous": true
};

//VALIDATE MODELS


describe('MODEL VALIDATIONS', function () {
    describe('User Model Validations', function () {
        it('should validate if email is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.email).to.exist;
                done();
            })
        });

        it('should validate if username is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.username).to.exist;
                done();
            })
        });

        it('should validate if firstname is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.firstname).to.exist;
                done();
            });
        });

        it('should validate if lastname is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.lastname).to.exist;
                done();
            });
        });

        it('should validate if usertype is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.usertype).to.exist;
                done();
            });
        });

        it('should validate if password is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.password).to.exist;
                done();
            });
        });

        it('should validate if index is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.index).not.to.exist;
                done();
            });
        });

        it('should validate if specialization is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.specialization).not.to.exist;
                done();
            });
        });

        it('should validate if non_aca_specialization is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.non_aca_specialization).not.to.exist;
                done();
            });
        });

        it('should validate if position is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.position).not.to.exist;
                done();
            });
        });

        it('should validate if working_place is empty', function (done) {
            var user = new User();

            user.validate(function (err) {
                expect(err.errors.working_place).not.to.exist;
                done();
            });
        });


    });

    describe("Question Model Validation", function () {
        it('should validate if question_content is empty', function (done) {
            var question = new Question();

            question.validate(function (err) {
                expect(err.errors.question_content).to.exist;
                done();
            });
        });

        /* it('should validate if tags is empty', function (done) {
             var question = new Question();
 
             question.validate(function (err) {
                 expect(err.errors.tags).to.exist;
                 done();
             });
         });*/

        it('should validate if type is empty', function (done) {
            var question = new Question();

            question.validate(function (err) {
                expect(err.errors.type).not.to.exist;
                done();
            });
        });

        it('should validate if user_posted is empty', function (done) {
            var question = new Question();

            question.validate(function (err) {
                expect(err.errors.user_posted).to.exist;
                done();
            });
        });

        it('should validate if anonymous is empty', function (done) {
            var question = new Question();

            question.validate(function (err) {
                expect(err.errors.anonymous).to.exist;
                done();
            });
        });

        it('should validate if date_posted is empty', function (done) {
            var question = new Question();

            question.validate(function (err) {
                expect(err.errors.date_posted).not.to.exist;
                done();
            });
        });
    });

    describe("Admin notification Model Validation", function () {
        it('should validate if firstname is empty', function (done) {
            var adminNotification = new Admin_notification();
            adminNotification.validate(function (err) {
                expect(err.errors.firstname).to.exist;
                done();
            });
        });

        it('should validate if lastname is empty', function (done) {
            var adminNotification = new Admin_notification();

            adminNotification.validate(function (err) {
                expect(err.errors.lastname).to.exist;
                done();
            });
        });

        it('should validate if username is empty', function (done) {
            var adminNotification = new Admin_notification();

            adminNotification.validate(function (err) {
                expect(err.errors.username).to.exist;
                done();
            });
        });

        it('should validate if usertype is empty', function (done) {
            var adminNotification = new Admin_notification();

            adminNotification.validate(function (err) {
                expect(err.errors.usertype).to.exist;
                done();
            });
        });

        it('should validate if position is empty', function (done) {
            var adminNotification = new Admin_notification();

            adminNotification.validate(function (err) {
                expect(err.errors.position).not.to.exist;
                done();
            });
        });

        it('should validate if status(boolean) is empty', function (done) {
            var adminNotification = new Admin_notification();

            adminNotification.validate(function (err) {
                expect(err.errors.status).to.exist;
                done();
            });
        });

        it('should validate if view-status(boolean) is empty', function (done) {
            var adminNotification = new Admin_notification();

            adminNotification.validate(function (err) {
                expect(err.errors.viewstatus).to.exist;
                done();
            });
        });

        it('should validate if date is empty', function (done) {
            var adminNotification = new Admin_notification();

            adminNotification.validate(function (err) {
                expect(err.errors.date).not.to.exist;
                done();
            });
        });

    });
});



chai.use(chaiHttp);

describe('/ Main Page', function () {
    it('#Main page status', function (done) {
        request('http://localhost:3000/api.qsolver.com', function (error, response, body) {
            expect(response.statusCode).to.equal(403);
            done();
        });
    });


});

describe('/User', function () {
    describe('/GET user', function () {
        it('#it should GET all the users', function (done) {
            chai.request(server)
                .get('/api.qsolver.com/user')
                .then((err, res) => {
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    done();
                });

        });

        it('#it should GET the specific user given by email the users', function (done) {
            chai.request(server)
                .get('/api.qsolver.com/user/'.concat(email))
                .end(function (err, res) {
                    res.should.have.status(200);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.body).should.be.a('object');
                    done();
                });
        });


    });
    describe('/POST user', () => {
        it('#it should signup user by POST request', function (done) {
            chai.request(server)
                .post('/api.qsolver.com/user/signup')
                .send(register_details)
                .end(function (err, res) {
                    res.should.have.status(200);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    done();

                });
        });

        it('#it should sign in user by POST request (valied username and password)', function (done) {
            chai.request(server)
                .post('/api.qsolver.com/user/login')
                .send(login_details)
                .end(function (err, res) {
                    res.should.have.status(200);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    done();

                });
        });

        it('#it should sign in user by POST request (invalied password)', function (done) {
            chai.request(server)
                .post('/api.qsolver.com/user/login')
                .send({
                    email: 'supimi.15@cse.mrt.ac.lk',
                    password: ''
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    done();

                });
        });


    });
    describe('/PUT user', () => {
        it('#it should PUT user details - (unable to update with false authentication)', function (done) {
            chai.request(server)
                .put('/api.qsolver.com/user/'.concat(email))
                .send(register_details)
                .end(function (err, res) {
                    res.should.have.status(403);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    done();

                });
        });

        it('#it should PUT user details - (authentication successful)', async () => {
            const results = await chai.request(server)
                .put('/api.qsolver.com/user/'.concat(email))
                .send({
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGltaSIsInVzZXJ0eXBlIjoiU3R1ZGVudCIsImlhdCI6MTUyNjE0MjI2M30.Xbe94AqQHG8JEX69iv46_lZw6pd4nkfGwPp4FL8pAdg",
                    "id": "5a90ff8b5604840e84cf50dd",
                    "firstname": "Supimi",
                    "lastname": "Piyumika",
                    "username": "Supimi",
                    "specialization": ["ppp", "qqq"],
                    "position": "",
                    "working_place": ""
                });
            expect(result.statusCode).to.equal(200);
        });

    });


});

describe('Admin Notifications', function () {
    describe('/POST user', function () {
        it('#it should POST new adminrequests', function (done) {
            chai.request(server)
                .post('/api.qsolver.com/adminNotification')
                .send(admin_request)
                .end(function (err, res) {
                    res.should.have.status(200);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    done();

                });
        });
    });
});

describe('Questions', function () {
    describe('#/POST question', function () {
        it('#it should POST new question', function (done) {
            chai.request(server)
                .post('/api.qsolver.com/question/')
                .send({
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGltaSIsInVzZXJ0eXBlIjoiU3R1ZGVudCIsImlhdCI6MTUyNjE0MjI2M30.Xbe94AqQHG8JEX69iv46_lZw6pd4nkfGwPp4FL8pAdg",
                    "question_content": "abcd",
                    "tags": [
                        "academic"
                    ],
                    "type": "academic subjects",
                    "user_posted": "supimi",
                    "anonymous": true
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    done();

                });
        });
    });
});

