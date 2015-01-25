var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/simple');

var personSchema = {
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  country: String

}
var Person = mongoose.model('Person', personSchema, 'people');

module.exports = function(app){


  app.get('/', function(req,res){
    Person.count(function(err,count){
      var num = count.toString();
      res.send(num);
    });

  });

  app.get('/people/:id', function(req,res){
    Person.find({id:req.params.id}).find(function(err,doc){
      if(err) res.send(err);
      res.send(doc);
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


//move mongodb stuff into seperate file
//make function for count & any other function we need
//write tests
//delete from db
//update db
//use cooler data


};