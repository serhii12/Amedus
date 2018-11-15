require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const cookieSession = require("cookie-session");

const app = express();

// eslint-disable-next-line import/order
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const morgan = require('morgan');

//setting cookie session to 6 hours
app.use(cookieSession({
  name: "session",
  keys: ["123"],
  maxAge: 6 * 60 * 60 * 1000
}));

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');

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
app.use('/api/users', usersRoutes(knex));
// This is the route to use for the orders
// app.use('/order', itemsRoutes(knex));

// Home page
app.get('/', (req, res) => {
  knex
    .select('*')
    .from('item')
    .catch(function(error) {
      console.error(error);
    })
    .then(function (results) {
      let templateVars = {results};
      console.log('RESULT WITH OBJECT',templateVars);
      res.render('index',results)});
  })

app.post('/checkout', (req, res) => {
  knex
    .select('*')
    .from('item')
    .catch(function(error) {
      console.error(error);
    })
    .then(function (results) {
      let templateVars = {results};
      console.log('RESULT WITH OBJECT',templateVars);
      res.render('checkout',results)});
  })


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);

});
