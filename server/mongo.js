var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/simple');

var personSchema = {
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  country: String

}
function personinit(){
  return mongoose.model('Person', personSchema, 'people');
}


exports.personinit = personinit;
