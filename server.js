require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
// might not need cookies
const cookieSession = require('cookie-session');

const app = express();

// Twilio setup
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const accountSid = 'ACfa1ca1e10683bd493f7fb5e71c3a4452';
const authToken = '40ee1a3973fb5f2e8975aab954516a81';
const client = require('twilio')(accountSid, authToken);

// eslint-disable-next-line import/order
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const morgan = require('morgan');

// setting cookie session to 6 hours - might not need it
app.use(
  cookieSession({
    name: 'session',
    keys: ['123'],
    maxAge: 6 * 60 * 60 * 1000,
  })
);

// Seperated Routes for each Resource
const checkoutRoutes = require('./routes/checkout');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  sass({
    src: `${__dirname}/public/sass`,
    dest: `${__dirname}/public/css`,
    debug: true,
    outputStyle: 'expanded',
  })
);

app.use(express.static('public'));

// Mount all resource routes
// app.use('/api/users', usersRoutes(knex));
app.use('/checkout', checkoutRoutes(knex));

// Home page
app.get('/', (req, res) => {
    knex
    .select('*')
    .from('item')
    .catch(error => {
      console.error(error);
    })
    .then(results => {
      const mainDishes = results.filter(element => element.section === 'main');
      const sideDishes = results.filter(element => element.section === 'side');
      const drinks = results.filter(element => element.section === 'drink');
      const templateVar = {
        mainDishes,
        sideDishes,
        drinks,
        count: req.session.count || 0,
      };
      res.render('index', templateVar);
    });
});

app.post('/addItem', (req, res) => {
  const itemID = req.body.id;
  req.session.cart = req.session.cart || {};
  req.session.cart[itemID] = req.session.cart[itemID] || 0;
  req.session.cart[itemID] += 1;
  req.session.count = req.session.count || 0;
  req.session.count += 1;
  res.json({ count: req.session.count, itemQty: req.session.cart[itemID] });
});


// add a post for removeItem
app.post('/removeItem', (req, res) => {
  const itemID = req.body.id;
  req.session.cart[itemID] -= 1;
  req.session.count -= 1;
  if (req.session.cart[itemID] === 0) {
    delete req.session.cart[itemID];
  }
  res.json({
    count: req.session.count,
    itemQty: req.session.cart[itemID] || 0,
  });
});

// removeElement
app.post('/removeElement', (req, res) => {
  const itemID = req.body.id;
  req.session.count -= req.session.cart[itemID];
  delete req.session.cart[itemID];
  res.json({ count: req.session.count });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
