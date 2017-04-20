let jwt = require('jwt-simple');
let User = require('../models/user');
let config = require('config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.Secret);
}

function signin(req, res, next) {
  res.send({
    token: tokenForUser(req.user),
    user_id: req.user.id,
    user_email: req.user.email
   });
}

function signup(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Please fill the email and password fields' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err)
    };
    if (existingUser) {
      return res.status(422).send({ error: 'Email already subscribed' });
    }

    let user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err)
      };
      res.send({
        token: tokenForUser(user),
        user_id: user.id,
        user_email: user.email
       });
    });
  });
}

module.exports = {
	signin,
	signup
};
