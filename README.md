mynetworkAPI
======
####HW 1 Assignment for Data Engineering w/ Ken Anderson -> Simple RESTful Service

Team wew :shipit:
* Alex Campbell (Zandrr)
* Edward Zhu (zhued)
* Josh Fermin (joshfermin)


##What we implemented:

[**MongoDB**](http://www.mongodb.org/) - for local database to store the json mock data.

[**Mockgoose**](https://github.com/mccormicka/Mockgoose) - test environment so we don't have to redo the database everytime.

[**mocha**](http://mochajs.org/) - Testing framework.

[**chai**](http://chaijs.com/) - Helper for mocha.


##How to Start Server

####Start Mongo

    sudo mongod

####Init Server (npm)
	
	npm install

	npm start

####Populate MongoDB

	curl http://localhost:3000/people/add




##What You Can Do!

#### Get COUNT of database entries
	
	curl http://localhost:3000/count

#### Get ALL people & details in database - as JSON

	curl http://localhost:3000/people

#### Get a SINGLE entry of a person

	curl http://localhost:3000/person/:id

#### ADD a single person entry

	curl -X POST http://localhost:3000/person?first_name=alex&last_name=campbell&email=alexis@campbell.com&country=noobland

#### UPDATE

	curl -X PUT http://localhost:3000/person/:id?first_name=edward

#### DELETE single person entry
	
	curl -X DELETE http://localhost:3000/person/:id

#### RESET database

	curl http://localhost:3000/people/reset

#### DROP database

	curl http://localhost:3000/people/drop

#### ADD database

	curl http://localhost:3000/people/add






