let mongoose = require('mongoose');
let Todo = require('../models/todo');

function getTodos(req, res) {
	let query = Todo.find({});
	query.exec((err, todos) => {
		if(err){
      res.send(err);
    }
		res.json(todos);
	});
}

function getTodosByUser(req, res) {
	let query = Todo.find({"user":req.params.id});
	query.exec((err, todos) => {
		if(err){
      return res.status(404).send({ error: 'No Data related' });
    }
		res.json(todos);
	});
}

function postTodo(req, res) {
	var newTodo = new Todo(req.body);
	newTodo.save((err,todo) => {
		if(err) {
			res.send(err);
		} else {
			res.json({ message: "Data added!", todo });
		}
	});
}

function getTodo(req, res) {
	Todo.findById(req.params.id, (err, todo) => {
		if(err){
      return res.status(404).send({ error: 'No Data related' });
    }
		res.json(todo);
	});
}

function deleteTodo(req, res) {
	Todo.remove({ _id : req.params.id}, (err, result) => {
		res.json({ message: "Data deleted!", result });
	});
}

function updateTodo(req, res) {
	Todo.findById({ _id: req.params.id}, (err, todo) => {
		if(err) {
			res.send(err);
		}
		Object.assign(todo, req.body).save((err, todo) => {
			if(err) {
				res.send(err);
			}
			res.json({ message: 'Data updated!', todo });
		});
	});
}

module.exports = {
	getTodos,
	getTodosByUser,
	postTodo,
	getTodo,
	deleteTodo,
	updateTodo
};
