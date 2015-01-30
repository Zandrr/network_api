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

    var Person = mongoose.model('Person'); // this is counting as a test, very good

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
            .end(function(err,res){
                if(err){ return err}
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain('"first_name":"Melissa"');
                expect(res.text).to.contain('"last_name":"Butler"');
                expect(res.text).to.contain('"email":"mbutler0@opensource.org"');
                expect(res.text).to.contain('"country":"China"');
                done();
        });
      });
    });

    describe('DELETE single person' , function(){
      it('deletes a single person', function(done){
        request(app).del('/person/57').expect(200, done);
        request(app)
            .get('/person/57')
            .end(function(err,res){
                if(err){ return err }
                expect(res.text).to.equal("[]")
        });
      });
    });

    describe('UPDATE single person', function(){
      it('responds with a single person object in JSON', function(done){
        request(app).put('/person/1?first_name=edward')
            .end(function(err,res){
                if(err){ return err}
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain('"first_name":"edward"');
                expect(res.text).to.contain('"last_name":"Butler"');
                expect(res.text).to.contain('"email":"mbutler0@opensource.org"');
                expect(res.text).to.contain('"country":"China"');
                done();
        });
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

    describe('POST single person', function(){
      it('responds with a single person object in JSON', function(done){
        request(app).post('/person?first_name=edward&last_name=zhu&email=zhued@zhued.com&country=China')
            .end(function(err,res){
                if(err){ return err}
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain('"id":1001')
                expect(res.text).to.contain('"first_name":"edward"');
                expect(res.text).to.contain('"last_name":"zhu"');
                expect(res.text).to.contain('"email":"zhued@zhued.com"');
                expect(res.text).to.contain('"country":"China"');
                done();
        });
      });
    });

    describe('DROP database', function(){
      it('drops the database..', function(done){
        request(app).get('/people/drop').expect(200, done);
        request(app).get('/count')
            .end(function(err,res){
                if(err){ return err }
                    // console.log(res.text)
                expect(res.text).to.equal('')
            });
      });
    });


    describe('ADD database', function(){
      it('ADD the database..', function(done){
        request(app).get('/people/drop');
        request(app).get('/people/add').expect(200, done);
        request(app).get('/count')
            .end(function(err,res){
                if(err){ return err }
                    console.log(res.text)
                expect(res.text).to.equal(1000)
            });
      });
    });

    describe('RESET database', function(){
      it('RESETS the database..', function(done){
        request(app).get('/people/reset').expect(200, done);
        request(app).get('/count')
            .end(function(err,res){
                if(err){ return err }
                expect(res.text).to.equal(1000)
            });
      });
    });


