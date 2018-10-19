const mongoose = require('mongoose');
const Game = require('./Game');
const User = require('./User');

const Schema = mongoose.Schema;
const GameplaySchema = new Schema({
  game: { type: Number, ref: Game },
  playerCount: Number,
  date: String,
  startHour: String,
  finishHour: String,
  duration: Number,
  mentor: { type: Schema.Types.ObjectId, ref: User },
});

const Gameplay = mongoose.model('Gameplay', GameplaySchema);
module.exports = Gameplay;
