process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Todo = require('../models/todo');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Todos', () => {
	beforeEach((done) => {
		Todo.remove({}, (err) => {
		   done();
		});
	});

  describe('/GET todo', () => {
	  it('GET all the todos', (done) => {
			chai.request(app)
		    .get('/todo')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });

  describe('/POST todo', () => {
	  it('POST todo without description field', (done) => {
	  	let todo = {
				title: "Clean the room",
	  	}
			chai.request(app)
		    .post('/todo')
		    .send(todo)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('description');
			  	res.body.errors.description.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('POST todo ', (done) => {
	  	let todo = {
	  		title: "Wash the Dishes",
	  		description: "Washing all the plates and glasses from yesterday's party",
	  	}
			chai.request(app)
		    .post('/todo')
		    .send(todo)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Data added!');
			  	res.body.todo.should.have.property('title');
			  	res.body.todo.should.have.property('description');
			  	res.body.todo.should.have.property('finished');
		      done();
		    });
	  });
  });

  describe('/GET/:id todo', () => {
	  it('GET todo by the given id', (done) => {
			let todo = new Todo({
	  		title: "Wash the Dishes",
	  		description: "Washing all the plates and glasses from yesterday's party",
	  	})
	  	todo.save((err, todo) => {
	  		chai.request(app)
		    .get('/todo/' + todo.id)
		    .send(todo)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title');
			  	res.body.should.have.property('description');
			  	res.body.should.have.property('finished');
			  	res.body.should.have.property('_id').eql(todo.id);
		      done();
		    });
	  	});

	  });
  });

  describe('/PUT/:id todo', () => {
	  it('should UPDATE todo given the id', (done) => {
			let todo = new Todo({
				title: "Wash the Dishes",
				description: "Washing all the plates and glasses from yesterday's party",
			})
	  	todo.save((err, todo) => {
				chai.request(app)
			    .put('/todo/' + todo.id)
			    .send({
						description: "Washing all the plates and glasses from yesterday's party. There are some bottles too!",
						finished: true
					})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Data updated!');
				  	res.body.todo.should.have.property('description').eql("Washing all the plates and glasses from yesterday's party. There are some bottles too!");
			      done();
			    });
		  });
	  });
  });

  describe('/DELETE/:id todo', () => {
	  it('DELETE todo given the id', (done) => {
	  	let todo = new Todo({
				title: "Wash the Dishes",
				description: "Washing all the plates and glasses from yesterday's party",
			})
	  	todo.save((err, todo) => {
				chai.request(app)
			    .delete('/todo/' + todo.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Data deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});
