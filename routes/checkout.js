require('dotenv').config();
// eslint-disable-next-line prefer-destructuring
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// eslint-disable-next-line prefer-destructuring
const accountSid = process.env.accountSid;
// eslint-disable-next-line prefer-destructuring
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

const express = require('express');

const router = express.Router();

module.exports = knex => {
  router.get('/', (req, res) => {
    const itemList = Object.keys(req.session.cart);
    const cartQty = req.session.cart;
    knex
      .select('*')
      .from('item')
      .whereIn('id', itemList)
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        console.log(results);
        const templateVars = { cartItems: results, cartQty };
        res.render('checkout', templateVars);
      });
  });

  router.post('/', (req, res) => {
    const itemList = Object.keys(req.session.cart);

    // generating an order
    knex('order')
      .insert({ phone_number: req.body.phone, status: 'placed' })
      .returning('id')
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        // inserting each item into the data base
        for (const item in itemList) {
          knex('orderitem')
            .insert({
              order_id: results[0],
              item_id: itemList[item],
              quantity: req.session.cart[itemList[item]],
            })
            .catch(error => {
              console.error(error);
            });
        }

        // sends a message to the restaurant with phone number of customer asks for time input
        client.messages
          .create({
            body: `Customer ${req.body.firstname} ${
              req.body.phone
            } just placed an order.\nPickup is set to 15 minutes\nClick here view order or change time\nhttp://bit.ly/2K926u2/${
              results[0]
            }`,
            from: '+16474908806',
            to: '+14163578459',
          })
          .then(message => console.log(message.sid))
          .done();

        // sends a message to the customer thanking them for their order
        client.messages
          .create({
            body: `${
              req.body.firstname
            } thank you for your order 🕷.  We'll send a pickup time shortly`,
            from: '+16474908806',
            to: `'+1'${req.body.phone}'`,
          })
          .then(message => console.log(message.sid))
          .done();

        // server sends back the orderID for the thank you for your order message
        res.json({
          OrderID: results[0],
        });
      });
  });
  return router;
};
