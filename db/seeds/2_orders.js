exports.seed = function(knex, Promise) {
  return knex('order')
    .del()
    .then(() =>
      Promise.all([
        knex('order').insert({
          phone_number: '6472234590',
          status: 'complete',
        }),
        knex('order').insert({
          phone_number: '6472234590',
          status: 'complete',
        }),
        knex('order').insert({
          phone_number: '6472234590',
          status: 'complete',
        }),
        knex('order').insert({
          phone_number: '6472234590',
          status: 'complete',
        }),
      ])
    );
};
