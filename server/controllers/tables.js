const moment = require('moment');
const Game = require('../models/Game');
const User = require('../models/User');
const GamePlay = require('../models/GamePlay');
const Table = require('../models/Table');

const { getStartEndofDateString } = require('../libs/date');

module.exports.controller = (app) => {
  app.get('/tables', async (req, res) => {
    try {
      const { startDate, endDate } = getStartEndofDateString(req.query.date);
      const tables = await Table.find({ start: { $gt: startDate, $lt: endDate } })
        .populate({ path: 'gamePlays',
          model: GamePlay,
          populate: [
            { path: 'game', model: Game, select: 'title' },
            { path: 'responsible', model: User, select: 'name' },
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
    const table = await Table.findById(req.params.id).populate('gamePlays').exec();
    res.send(table);
  });

  app.post('/tables', (req, res) => {
    const startDate = moment(req.body.date).toDate();
    const newTable = new Table({
      start: startDate,
    });

    newTable.save((err, table) => {
      if (err) { console.log(err); }
      res.send(table);
    });
  });

  app.put('/table/:id', async (req, res) => {
    const updatedTable = await Table.findById(req.params.id);
    updatedTable.start = req.body.start;
    updatedTable.finish = req.body.finish;
    updatedTable.save((err, table) => {
      if (err) { console.log(err); }
      res.send(table);
    });
  });

  app.post('/table/:id/gameplay', async (req, res) => {
    const newGamePlay = new GamePlay({
      game: req.body.gameId,
      playerCount: req.body.playerCount,
      start: req.body.start,
      finish: req.body.finish,
      responsible: req.body.userId,
    });
    const gamePlay = await newGamePlay.save();
    const table = await Table.findById(req.params.id);
    table.gamePlays.push(gamePlay);
    await table.save();
    res.send(gamePlay);
  });
};
