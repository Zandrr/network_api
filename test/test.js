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

    var Person = mongoose.model('Person');

    beforeEach(function(done){
      mockgoose.reset();
      for(var i = 0; i < data.length; i++){
        new Person(data[i]).save();
      }
      done();
    });

    



    describe('GET single person', function(){
      it('responds with a single person object in JSON', function(done){
        request(app).get('/person/1')
            // .type('form')
            // .send({field: "Test string."})
            .end(function(err,res){
                if(err){ console.log(err)}
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain('"first_name":"Melissa"');
                expect(res.text).to.contain('"last_name":"Butler"');
                expect(res.text).to.contain('"email":"mbutler0@opensource.org"');
                expect(res.text).to.contain('"country":"China"');
                done();
        })
        // request(app)
        // .get('/person/1')
        // .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        // .expect([{
        // _id: "54c43aaf25aa864371193fa9",
        // id: 1,
        // first_name: "Melissa",
        // last_name: "Butler",
        // email: "mbutler0@opensource.org",
        // country: "China"}])
        // .expect(200,done);

      });
    });

    describe('DELETE single person' , function(){
      it('deletes a single person', function(done){
        request(app)
        .del('/person/57')
        .expect(Person.count({}, function(err, count){ return count}).should.equal(999))
        .expect(200, done);
      });
    });

    describe('GET all people', function(){
      it('responds with a list of people objects in JSON', function(done){
        request(app)
        .get('/people')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      });
    });

