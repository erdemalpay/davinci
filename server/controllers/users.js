const User = require('../models/User');

module.exports.controller = (app) => {
  app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) { console.log(err); }
      res.send({
        users,
      });
    });
  });

  app.get('/api/user/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) { console.log(err); }
      res.send(user);
    });
  });

  app.post('/api/users', (req, res) => {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    });

    newUser.save((err, user) => {
      if (err) { console.log(err); }
      res.send(user);
    });
  });
};
