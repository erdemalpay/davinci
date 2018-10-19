const bgg = require('../libs/bgg');
const Game = require('../models/Game');

const addGame = async (id) => {
  const gameDetails = await bgg.getGameDetails(id);
  const game = new Game(gameDetails);
  await game.save();
  return true;
};

module.exports = {
  addGame,
};
