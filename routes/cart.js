const express = require('express');

const router = express.Router();

module.exports = knex => {
  router.post('/addItem', (req, res) => {
    const itemID = req.body.id;
    knex
      .select('*')
      .from('item')
      .where('id', itemID)
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        req.session.cart = req.session.cart || {};
        req.session.cart[itemID] = req.session.cart[itemID] || 0;
        req.session.cart[itemID] += 1;
        req.session.count = req.session.count || 0;
        req.session.count += 1;
        res.json({
          unitPrice: results[0].price,
          count: req.session.count,
          itemQty: req.session.cart[itemID],
        });
      });
  });

  // add a post for removeItem
  router.post('/removeItem', (req, res) => {
    const itemsIds = req.body.id;
    knex
      .select('*')
      .from('item')
      .where('id', itemsIds)
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        const itemID = req.body.id;
        req.session.cart[itemID] -= 1;
        req.session.count -= 1;
        if (req.session.cart[itemID] === 0) {
          delete req.session.cart[itemID];
        }
        res.json({
          unitPrice: results[0].price,
          count: req.session.count,
          itemQty: req.session.cart[itemID] || 0,
        });
      });
  });

  // removeElement
  router.post('/removeElement', (req, res) => {
    const itemID = req.body.id;
    req.session.count -= req.session.cart[itemID];
    delete req.session.cart[itemID];
    res.json({ count: req.session.count });
  });
  return router;
};
