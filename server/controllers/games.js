const Game = require('../models/Game');

module.exports.controller = (app) => {
  app.get('/api/games', async (req, res) => {
    const games = await Game.find().sort({ title: 1 });
    res.send({
      games,
    });
  });

  app.get('/api/game/:id', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
      if (err) { console.log(err); }
      res.send(game);
    });
  });

  app.post('/api/games', (req, res) => {
    const newGame = new Game({
      _id: req.body.id,
      title: req.body.title,
    });

    newGame.save((err, game) => {
      if (err) { console.log(err); }
      res.send(game);
    });
  });

  app.delete('/api/games/:id', (req, res) => {
    Game.findByIdAndRemove(req.params.id, (err) => {
      if (err) { console.log(err); }
      res.sendStatus(204);
    });
  });
};
