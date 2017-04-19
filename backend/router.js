let user = require('./routes/user');
let todo = require('./routes/todo');
let passportService = require('./services/passport');
let passport = require('passport');

let requireAuth = passport.authenticate('jwt', { session: false });
let requireSignin = passport.authenticate('local', { session: false });



module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Welcome ' });
  });
  app.post('/signin', requireSignin, user.signin);
  app.post('/signup', user.signup);

  app.route("/todo")
      .get(todo.getTodos)
      .post(todo.postTodo);
  app.route("/todo/:id")
      .get(todo.getTodo)
      .delete(todo.deleteTodo)
      .put(todo.updateTodo);
  app.route("/todo/user/:id")
      .get(todo.getTodosByUser);
}
