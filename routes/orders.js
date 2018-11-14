const express = require('express');

const router = express.Router();

module.exports = knex => {
  router.post('/order/:orderid/item/:itemid', (req, res) => {
    knex
      .insert({
        order_id: req.params.orderid,
        item_id: item_id })
      .from('orderitem')
      .then(results => {
        res.json(results);
      });
  });

  return router;
};




app.post("/urls/:id/delete", (req, res) => {
  if (!req.session.user_id) {
    res.status(401).send('<html><body><center><br/><br/> PLEASE LOG IN TO DELETE THE LINK<center></body></html>\n')
  } else if (urlDatabase[req.params.id].id === req.session.user_id) {
    delete urlDatabase[req.params.id];

   knex('orderitem').insert({
          id: 1,
          order_id: 1,
          item_id: 5,
          quantity: 1}),
