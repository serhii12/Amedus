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
  router.get('/:orderID', (req, res) => {
    knex
      .select('phone_number')
      .from('order')
      .where('id', req.params.orderID)
      .catch(error => {
        console.error(error);
      })
      .then(phone => {
        knex
          .select('item_id', 'quantity')
          .from('orderitem')
          .where('order_id', req.params.orderID)
          .catch(error => {
            console.error(error);
          })
          .then(itemIDs => {
            const itemList = [];
            for (let i = 0; i < itemIDs.length; i++) {
              itemList.push(itemIDs[i].item_id);
            }
            knex
              .select('*')
              .from('item')
              .whereIn('id', itemList)
              .catch(error => {
                console.error(error);
              })
              .then(results => {
                const templateVars = {
                  qty: itemIDs,
                  cartItems: results,
                  phoneNumber: phone[0].phone_number,
                  orderID: req.params.orderID,
                };
                res.render('orderdisplay', templateVars);
              });
          });
      });
  });

  router.post('/:orderID', (req, res) => {
    // sends a message to the customer with confirm order and time
    let custMessage;
    if (req.body.timeTillReady !== 'cancel') {
      custMessage = `Thank you 🦄.  Your order will be ready in ${
        req.body.timeTillReady
      } minutes.  ${req.body.custommsg}`;
    } else {
      custMessage = `Sorry 😕.  Your order has been cancelled by the restaurant.  ${
        req.body.custommsg
      }`;
    }

    client.messages
      .create({
        body: custMessage,
        from: '+16474908806',
        to: `'+1'${req.body.userphone}'`,
      })
      .then(message => console.log(message.sid))
      .done();

    res.send(
      `<html>
      <body>
        <center>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1>YOU HAVE SUCCESSFULLY INFORMED THE CUSTOMER</h1>
        <center>
      </body>
      </html>`
    );
  });
  return router;
};
