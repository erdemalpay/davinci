const mongoose = require('mongoose');
const { fillGames } = require('./fillGames');

// connect to mongodb
mongoose.connect('mongodb://localhost/davinci', async () => {
  console.log('Connection has been made');
  await fillGames();
  process.exit(0);
}).catch((err) => {
  console.error('App starting error:', err.stack);
  process.exit(1);
});
