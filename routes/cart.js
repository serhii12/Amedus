const express = require('express');

const router = express.Router();

module.exports = knex => {
  router.post('/addItem', (req, res) => {
    const itemID = req.body.id;
    knex
      .select('*')
      .from('item')
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        console.log(results);
        req.session.cart = req.session.cart || {};
        req.session.cart[itemID] = req.session.cart[itemID] || 0;
        req.session.cart[itemID] += 1;
        req.session.count = req.session.count || 0;
        req.session.count += 1;
        let total = 0;
        results.forEach(item => {
          if (req.session.cart[item.id]) {
            total += req.session.cart[item.id] * item.price;
          }
        });
        res.json({
          unitPrice: results[itemID - 1].price,
          count: req.session.count,
          itemQty: req.session.cart[itemID],
          total,
        });
      });
  });

  // add a post for removeItem
  router.post('/removeItem', (req, res) => {
    const itemID = req.body.id;
    knex
      .select('*')
      .from('item')
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        req.session.cart[itemID] -= 1;
        req.session.count -= 1;
        if (req.session.cart[itemID] === 0) {
          delete req.session.cart[itemID];
        }
        let total = 0;
        results.forEach(item => {
          if (req.session.cart[item.id]) {
            total += req.session.cart[item.id] * item.price;
          }
        });
        res.json({
          unitPrice: results[itemID - 1].price,
          count: req.session.count,
          itemQty: req.session.cart[itemID] || 0,
          total,
        });
      });
  });

  // removeElement
  router.post('/removeElement', (req, res) => {
    const itemID = req.body.id;
    knex
      .select('*')
      .from('item')
      .catch(error => {
        console.error(error);
      })
      .then(results => {
        req.session.count -= req.session.cart[itemID];
        delete req.session.cart[itemID];
        let total = 0;
        results.forEach(item => {
          if (req.session.cart[item.id]) {
            total += req.session.cart[item.id] * item.price;
          }
        });
        res.json({ count: req.session.count, total });
      });
  });

  return router;
};
