exports.seed = function(knex, Promise) {
  return knex('orderitem')
    .del()
    .then(() =>
      Promise.all([
        knex('orderitem').insert({
          id: 1,
          order_id: 1,
          item_id: 5,
          quantity: 1}),
        knex('orderitem').insert({
          id: 2,
          order_id: 2,
          item_id: 3,
          quantity: 1 }),
        knex('orderitem').insert({
          id: 3,
          order_id: 3,
          item_id: 7,
          quantity: 1 }),
        knex('orderitem').insert({
          id: 4,
          order_id: 4,
          item_id: 6,
          quantity: 1 })
      ])
    );
};
