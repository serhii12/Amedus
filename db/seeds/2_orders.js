exports.seed = function(knex, Promise) {
  return knex('order')
    .del()
    .then(() =>
      Promise.all([
        knex('order').insert({
          id: 1,
          phone_number: '6472234590',
          status: "complete" }),
        knex('order').insert({
          id: 2,
          phone_number: '6472234590',
          status: "complete" }),
        knex('order').insert({
          id: 3,
          phone_number: '6472234590',
          status: "complete" }),
        knex('order').insert({
          id: 4,
          phone_number: '6472234590',
          status: "complete" })
      ])
    );
};
