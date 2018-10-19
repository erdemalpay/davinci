const mongoose = require('mongoose');
const Gameplay = require('./Gameplay');

const Schema = mongoose.Schema;
const TableSchema = new Schema({
  gameplays: [{ type: Schema.Types.ObjectId, ref: Gameplay }],
  name: String,
  date: String,
  startHour: String,
  finishHour: String,
});

const Table = mongoose.model('Table', TableSchema);
module.exports = Table;
