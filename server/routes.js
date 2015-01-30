var db        = require('./mongo.js');
var mockdata = require('../mockdata.json')
var Person = db.personinit();


module.exports = function(app){

// ***
// Returns the number of entries in the field
// ***
  app.get('/', function(req,res){
    Person.count(function(err,count){
      console.log(count)
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
      Person.create({id:count+1,first_name:req.query.first_name,last_name:req.query.last_name,email:req.query.email,country:req.query.country}, function(err,doc){
        if(err) res.send(err);
        res.status(200).send(doc);
      });
    });
  });

// ***
// Inserts a new entry into the database
// ***
  app.post('/person', function(req,res){
    Person.count(function(err,count){
      Person.create({id:count,first_name:req.query.first_name,last_name:req.query.last_name,email:req.query.email,country:req.query.country}, function(err,doc){
        if(err) res.send(err);
        res.status(200).send(doc);
      });
    });
  });

// ***
// Drops database
// ***
  app.get('/people/drop', function(req, res) {
    Person.remove({}, function(err){
      if (err) res.send(err);
      res.status(200).send("Database successfully dropped.");
    });
  });

// ***
// Populate data from mockdata.json
// ***
  app.get('/people/add', function(req, res){
    for(var i = 0; i < mockdata.length; i++){
      new Person(mockdata[i]).save();
    }
    res.status(200).send("Database successfully added from mockdata.json.");
  });

// ***
// Clear database and populate data from mockdata.json
// ***
  app.get('/people/reset', function(req, res){
    Person.remove({}, function(err){
      if (err) res.send(err);
       for(var i = 0; i < mockdata.length; i++){
          new Person(mockdata[i]).save();
        }
      res.status(200).send("Database successfully reset.");
    });
  });





//make function for count & any other function we need
//write tests
//use cooler data
};

