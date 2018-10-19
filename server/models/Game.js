const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const GameSchema = new Schema({
  _id: Number,
  title: String,
  image: String,
  thumbnail: String,
  expansion: Boolean,
});

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;
