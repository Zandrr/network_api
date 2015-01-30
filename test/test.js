var request = require('supertest'),
    chai = require('chai')
    express = require('express'),
    app     = require('../server/index.js'),
    db      = require('../server/mongo.js'),
    data    = require('../mockdata.json'),
    mongoose = require('mongoose'),
    mockgoose = require('mockgoose');


    var expect = chai.expect,
        should = chai.should();

    if(process.env.NODE_ENV != 'development'){
        console.log('in development mode');
        mockgoose(mongoose);
    }

    // var Person = mongoose.model('Person');

    // beforeEach(function(done){
    //   mockgoose.reset();
    //   for(var i = 0; i < data.length; i++){
    //     new Person(data[i]).save();
    //   }
    // });

    



    // describe('GET single person', function(){
    //   it('responds with a single person object in JSON', function(done){
    //     request(app)
    //     .get('/person/1')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/)
    //     .expect([{
    //     _id: "54c43aaf25aa864371193fa9",
    //     id: 1,
    //     first_name: "Melissa",
    //     last_name: "Butler",
    //     email: "mbutler0@opensource.org",
    //     country: "China"}])
    //     .expect(200,done);
    //   });
    // });

    // describe('DELETE single person' , function(){
    //   it('deletes a single person', function(done){
    //     request(app)
    //     .del('/person/57')
    //     .expect(mockgoose.count().should.equal(999))
    //     .expect(200);
    //   });
    // });

    describe('GET all people', function(){
      it('responds with a list of people objects in JSON', function(done){
        request(app)
        .get('/people')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      });
    });

