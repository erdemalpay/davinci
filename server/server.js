const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
/* const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey'; */

const gameRoute = require('./controllers/games');
const tableRoute = require('./controllers/tables');
const userRoute = require('./controllers/users');

const app = express();
const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://85f9d96e47814fb9807f0e720d6f9060@sentry.io/1294384', handlePromiseRejection: true });

const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
// app.use(passport.initialize());

// connect to mongodb
mongoose.connect('mongodb://localhost/davinci', () => {
  console.log('Connection has been made');
}).catch((err) => {
  console.error('App starting error:', err.stack);
  process.exit(1);
});

require('./models/Game');
require('./models/User');
require('./models/GamePlay');
require('./models/Table');

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.get('/error', () => {
  throw new Error('Broke!');
});

gameRoute.controller(app);
tableRoute.controller(app);
userRoute.controller(app);

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized!' });
});

app.use(Sentry.Handlers.errorHandler());

const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
