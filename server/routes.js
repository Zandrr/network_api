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
      res.status(200).send(doc);
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
      res.status(200).send(doc);
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

  app.put('/person/:id', function(req, res){
    // Person.findById(req.params.id, function(err, doc){
    // Person.find({id:req.params.id}).find(function(err,doc){
    //   doc.first_name = req.body.first_name;
    //   doc.last_name = req.body.last_name;
    //   doc.email = req.body.email;
    //   doc.country  = req.body.country;
    //   doc.save(function(err){
    //     if(!err){
    //       res.send("Updated " + req.params.id);
    //     } else {
    //       res.send(err);
    //     }
    //   });
    // });

    Person.findOneAndUpdate(
      {id:req.params.id}, 
      {first_name:req.body.first_name, last_name:req.body.last_name, email:req.body.email, country:req.body.country},
      function(err, doc){
        if(err) res.send(err);
        res.send("updated"+req.params.id)
      })
  });
//   app.put('/api/products/:id', function (req, res){
//   return ProductModel.findById(req.params.id, function (err, product) {
//     product.title = req.body.title;
//     product.description = req.body.description;
//     product.style = req.body.style;
//     return product.save(function (err) {
//       if (!err) {
//         console.log("updated");
//       } else {
//         console.log(err);
//       }
//       return res.send(product);
//     });
//   });
// });
    

};
// http://localhost:3000/person?id=1001&first_name=edward&last_name=zhu&email=zhued@zhued.com&country=china

//make function for count & any other function we need
//write tests
//update db
//use cooler data


