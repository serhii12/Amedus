const express = require('express');

const router = express.Router();

module.exports = knex => {
  let templateVars;
  router.post('/', (req, res) => {
    const itemList = req.body.orderInfo;
    knex
      .select('*')
      .from('item')
      .whereIn('id', itemList)
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        templateVars = { cartItems: results };
        res.end();
      });
  });
  router.get('/', (req, res) => {
    res.render('checkout', templateVars);
  });
  return router;
};
