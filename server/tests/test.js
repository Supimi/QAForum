/*//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
//let chaiHttp = require('chai-http');
//let server = require('../../server');
let should = chai.should();
let assert = require('assert');

//chai.use(chaiHttp);
//Our parent block
/*describe('User', () => {
    /*
      * Test the /GET route for all users
      *//*
describe('/GET user', () => {
it('it should GET all the users', () => {
chai.request(server)
.get('/api.qsolver.com/user')
.end((err, res) => {
res.should.have.status(200);
res.body.should.be.a('array');
//console.log(res.body);
done();
});
});
});

});*//*

it('should list ALL blobs on /blobs GET', function (done) {
    chai.request(server)
        .get('/blobs')
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
});

//just a test
describe("smoke test", function () {
    it("checks equality", function () {
        assert.equal(true, false);
    });
});*/

var chai = require("chai");
var chaihttp = require("chai-http");
var server = require('../../server');
var should = chai.should();

chai.use(chaihttp);

describe('User', function () {
    it('should list ALL users on /blobs GET', function () {

    });
    it('should list a SINGLE blob on /blob/<id> GET');
    it('should add a SINGLE blob on /blobs POST');
    it('should update a SINGLE blob on /blob/<id> PUT');
    it('should delete a SINGLE blob on /blob/<id> DELETE');
});



