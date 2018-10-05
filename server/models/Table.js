const mongoose = require('mongoose');
const moment = require('moment');
const GamePlay = require('./GamePlay');

const Schema = mongoose.Schema;
const TableSchema = new Schema({
  gamePlays: [{ type: Schema.Types.ObjectId, ref: GamePlay }],
  start: Date,
  finish: Date,
  startHour: String,
  finishHour: String,
  duration: Number,
});

TableSchema.pre('save', (next) => {
  if (this.finish && this.start) {
    this.startHour = moment(this.start).format('HH:mm');
    this.finishHour = moment(this.finish).format('HH:mm');
    this.duration = moment(this.finish).diff(this.start, 'minutes');
  }
  next();
});

const Table = mongoose.model('Table', TableSchema);
module.exports = Table;
