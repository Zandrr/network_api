var db = require('./mongo.js');
var Person = db.personinit();

module.exports = function(app){


  app.get('/', function(req,res){
    Person.count(function(err,count){
      var num = count.toString();
      res.send(num);
    });

  });

  app.get('/person/:id', function(req,res){
    Person.find({id:req.params.id}).find(function(err,doc){
      if(err) res.send(err);
      res.send(doc);
    });
  });

  app.delete('/person/:id', function(req,res){
    Person.remove( {id:req.params.id}, function(err,person){
      if(err) res.send(err);
      res.send("removed "+req.params.id);
    });

  });

  app.get('/people', function(req,res){
    Person.find(function(err,doc){
      if(err) res.send(err);
      res.send(doc);
    });
  });

  app.post('/person', function(req,res){
    Person.count(function(err,count){
      Person.create({id:count,first_name:req.query.first_name,last_name:req.query.last_name,email:req.query.email,country:req.query.country}, function(err,doc){
        if(err) res.send(err);
        res.send(doc);
      });
    });
  });


    

};
//make function for count & any other function we need
//write tests
//update db
//use cooler data


