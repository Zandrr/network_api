var db = require('./mongo.js');
var Person = db.personinit();

module.exports = function(app){

// ***
// Returns the number of entries in the field
// ***
  app.get('/', function(req,res){
    Person.count(function(err,count){
      var num = count.toString();
      res.send(num);
    });
  });


// ***
// Gets a field in the database with the id given
// ***
  app.get('/person/:id', function(req,res){
    Person.find({id:req.params.id}).find(function(err,doc){
      if(err) res.send(err);
      res.status(200).send(doc);
    });
  });


// ***
// Deletes an entry in the database
// ***
  app.delete('/person/:id', function(req,res){
    Person.remove( {id:req.params.id}, function(err,person){
      if(err) res.send(err);
      res.status(200).send("removed "+req.params.id);
    });
  });


// ***
// Updates an entry with given id with whatever updates needed
// ***
  app.put('/person/:id', function(req, res){
    var query = {id:req.params.id};
    var update = req.query;
    var options = {new:true, $set:update};
    Person.findOneAndUpdate(query, update, options, function(err,person){
      if(err) res.send(err);
      res.status(200).send(person);
    });
  }); 
  //http://localhost:3000/person/1001?first_name=edward&last_name=zhu&email=zhued@zhued.com&country=china


// ***
// Outputs everything in the database
// ***
  app.get('/people', function(req,res){
    Person.find(function(err,doc){
      if(err) res.send(err);
      res.status(200).send(doc);
    });
  });


// ***
// Inserts a new entry into the database
// ***
  app.post('/person', function(req,res){
    Person.count(function(err,count){
      Person.create({id:count,first_name:req.query.first_name,last_name:req.query.last_name,email:req.query.email,country:req.query.country}, function(err,doc){
        if(err) res.send(err);
        console.log(req.query);
        res.status(200).send(doc);
      });
    });
  });


// ***
// COUNT - Find the number of sets that have the same attributes of a certain field
// ***




//make function for count & any other function we need
//write tests
//use cooler data
};

