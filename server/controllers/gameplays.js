const Gameplay = require('../models/Gameplay');

module.exports.controller = (app) => {
  app.put('/api/gameplay/:id', async (req, res) => {
    const gameplay = await Gameplay.findById(req.params.id);
    gameplay.playerCount = req.body.playerCount;
    gameplay.mentor = req.body.mentor;
    gameplay.game = req.body.game;

    await gameplay.save();
    res.send(gameplay);
  });
};
