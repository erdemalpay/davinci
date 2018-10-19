const _ = require('lodash');
const Game = require('../models/Game');
const User = require('../models/User');
const Gameplay = require('../models/Gameplay');
const Table = require('../models/Table');
const { asyncForEach } = require('../libs/async');

module.exports.controller = (app) => {
  app.get('/tables', async (req, res) => {
    try {
      const tables = await Table.find({ date: req.query.date })
        .populate({ path: 'gameplays',
          model: Gameplay,
          populate: [
            { path: 'game', model: Game },
            { path: 'mentor', model: User, select: 'name' },
          ],
        })
        .exec();
      res.send({
        tables,
      });
    } catch (e) {
      console.log(e);
    }
  });

  app.get('/table/:id', async (req, res) => {
    const table = await Table.findById(req.params.id)
      .populate({ path: 'gameplays',
        model: Gameplay,
        populate: [
          { path: 'game', model: Game },
          { path: 'mentor', model: User, select: 'name' },
        ],
      })
      .exec();
    res.send({
      table,
    });
  });

  app.post('/tables', (req, res) => {
    const newTable = new Table(req.body);
    newTable.save((err, table) => {
      if (err) { console.log(err); }
      res.send(table);
    });
  });

  app.put('/table/:id', async (req, res) => {
    const updatedTable = await Table.findById(req.params.id);
    updatedTable.name = req.body.name;
    updatedTable.startHour = req.body.startHour;
    updatedTable.finishHour = req.body.finishHour;
    updatedTable.save((err, table) => {
      if (err) { console.log(err); }
      res.send(table);
    });
  });

  app.post('/table/:id/gameplay', async (req, res) => {
    const newGameplay = new Gameplay(req.body.gameplay);
    const gameplay = await newGameplay.save();
    const table = await Table.findById(req.params.id);
    table.gameplays.push(gameplay);
    await table.save();
    res.send(gameplay);
  });

  app.delete('/table/:tableId/gameplay/:gameplayId', async (req, res) => {
    await Gameplay.findByIdAndDelete(req.params.gameplayId);
    const table = await Table.findById(req.params.tableId).exec();
    _.remove(table.gameplays, gameplay => (
      gameplay._id.toString() === req.params.gameplayId
    ));
    table.markModified('gameplays');
    await table.save();
    res.send(table);
  });

  app.delete('/tables/:tableId', async (req, res) => {
    const table = await Table.findById(req.params.tableId).exec();
    await asyncForEach(table.gameplays, async (gameplayId) => {
      await Gameplay.findByIdAndDelete(gameplayId);
    });
    await Table.findByIdAndDelete(req.params.tableId);
    res.sendStatus(204);
  });
};
