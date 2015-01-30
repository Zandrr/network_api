var request = require('supertest'),
    express = require('express'),
    app     = require('../server/index.js'),
    mongoose = require('../server/mongo.js'),
    mockgoose = require('mockgoose');

    if(process.env.NODE_ENV != 'test'){
        console.log('in test mode');
        mockgoose(mongoose);
    }


    describe('GET', function(){
      it('responds with a list of people objects in JSON', function(done){
        request(app)
        .get('/people')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,done);
      });
    });

    describe('GET', function(){
      it('responds with a single person object in JSON', function(done){
        request(app)
        .get('/person/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect([{
        _id: "54c43aaf25aa864371193fa9",
        id: 1,
        first_name: "Melissa",
        last_name: "Butler",
        email: "mbutler0@opensource.org",
        country: "China"}])
        .expect(200,done);
      });
    });
