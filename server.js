require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');

const app = express();

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
const cartRoutes = require('./routes/cart');
const orderdisplayRoutes = require('./routes/orderdisplay');

app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our ejs files
app.set('view engine', 'ejs');
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all resource routes
app.use('/checkout', checkoutRoutes(knex));
app.use('/cart', cartRoutes(knex));
app.use('/orderdisplay', orderdisplayRoutes(knex));

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
