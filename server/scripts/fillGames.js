const Game = require('../models/Game');
const bgg = require('../libs/bgg');
const { asyncForEach, sleep } = require('../libs/async');

const fillGames = async () => {
  try {
    const games = await Game.find({ expansion: { $exists: false } }).exec();
    const ids = games.reduce(((a, b) => `${b._id},${a}`), '');
    console.log(ids);
    const updatedGames = await bgg.getMultipleGameDetails(ids);
    await asyncForEach(updatedGames, async (updatedGame) => {
      console.log(updatedGame.title);
      await Game.findOneAndUpdate({ _id: updatedGame._id }, updatedGame, { upsert: true }).exec();
      await sleep(100);
    });
  } catch (e) {
    console.log(e);
  }
  return true;
};

module.exports = {
  fillGames,
};
