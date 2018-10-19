const Game = require('../models/Game');

module.exports.controller = (app) => {
  app.get('/games', async (req, res) => {
    const games = await Game.find().sort({ title: 1 });
    res.send({
      games,
    });
  });

  app.get('/game/:id', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
      if (err) { console.log(err); }
      res.send(game);
    });
  });

  app.post('/games', (req, res) => {
    const newGame = new Game({
      _id: req.body.id,
      title: req.body.title,
    });

    newGame.save((err, game) => {
      if (err) { console.log(err); }
      res.send(game);
    });
  });
};
