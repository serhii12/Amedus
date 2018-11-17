const express = require('express');

const router = express.Router();

module.exports = knex => {
  // let templateVars;
  // Ajax is sending the cart to the checkout page
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



  router.post('/confirm', (req, res) => {
    let itemList = [1,2,3,4,5];
      knex('order')
      .insert({ phone_number: req.body.phone, status: "placed" })
      .returning("id")
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        for (let item in itemList) {
          knex('orderitem')
          .insert({ order_id: results[0], item_id: item, quantity: 1 })
          .catch(error => {
            console.error(error);
          })
          .then(output => {
            console.log("Data inserted", output);
          });
        }
        const templateVars = { orderID: results[0] }
      });
  });

  return router;
};

// sends a message to the customer thanking them for their order
//     client.messages
//   .create({
//     body: 'Thank you for your order 🕷.  We\'ll send a pickup time shortly',
//      // body: `Thanks for your order from RESTAURANT...it  will be ready for pickup in 15 minutes.`,
//      from: '+16474908806',
//      to: `'+1'${req.body.usrtel}'`
//    })
//   .then(message => console.log(message.sid))
//   .done();

// //sends a message to the restaurant with phone number of customer asks for time input
//       client.messages
//   .create({
//      body: `🦕Customer ${req.body.usrtel} just placed an order.\nPickup is set to 15 minutes\nClick here view order or change time\nhttp://bit.ly/2qNy6Lm/${req.body.orderid}`,
//      from: '+16474908806',
//      to: '+14163578459'
//    })
//   .then(message => console.log(message.sid))
//   .done();

// });

// app.post('/ordertime/:phone', function(req, res) {
//   console.log(req.body.time);
//   console.log(req.body.userphone);

//     //sends a message to the customer with confirm order and time
//     var custMessage = "";
//     if(req.body.time !== 'cancel') {
//        custMessage = `Thank you 🦄.  Your order will be ready in ${req.body.time} minutes.  ${req.body.custommsg}`
//     } else {
//        custMessage = `Sorry 😕.  Your order has been cancelled by the restaurant.  ${req.body.custommsg}`
//     };

//     client.messages
//   .create({
//      body: custMessage,
//      // body: `Thank you 🦄.  Your order will be ready in ${req.body.time} minutes.`,
//      from: '+16474908806',
//      to: `'+1'${req.body.userphone}'`
//      // to: `'+1'${req.body.userphone}'`
//    })
//   .then(message => console.log(message.sid))
//   .done();
