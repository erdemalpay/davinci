const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const GameSchema = new Schema({
  _id: Number,
  title: String,
});

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;