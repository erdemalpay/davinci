const mongoose = require('mongoose');
const moment = require('moment');
const Game = require('./Game');
const User = require('./User');

const Schema = mongoose.Schema;
const GamePlaySchema = new Schema({
  game: { type: Number, ref: Game },
  playerCount: Number,
  start: Date,
  finish: Date,
  startHour: String,
  finishHour: String,
  duration: Number,
  responsible: { type: Schema.Types.ObjectId, ref: User },
});

GamePlaySchema.pre('save', (next) => {
  if (this.finish && this.start) {
    this.startHour = moment(this.start).format('HH:mm');
    this.finishHour = moment(this.finish).format('HH:mm');
    this.duration = moment(this.finish).diff(this.start, 'minutes');
  }
  next();
});

const GamePlay = mongoose.model('GamePlay', GamePlaySchema);
module.exports = GamePlay;
