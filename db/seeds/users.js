exports.seed = function(knex, Promise) {
  return knex('item')
    .del()
    .then(() =>
      Promise.all([
        knex('item').insert({
          id: 1,
          name: 'Hamburger',
          price: 5.99,
          section: "main" }),
        knex('item').insert({
          id: 2,
          name: 'Cheeseburger',
          price: 6.29,
          section: "main" }),
        knex('item').insert({
          id: 3,
          name: 'Bacon Cheeseburger',
          price: 7.99,
          section: "main" }),
        knex('item').insert({
          id: 4,
          name: 'Chicken Strips',
          price: 5.99,
          section: "main" }),
        knex('item').insert({
          id: 5,
          name: 'Chicken Bacon Ranch',
          price: 8.29,
          section: "main" }),
        knex('item').insert({
          id: 6,
          name: 'Holy Smokes Burger',
          price: 10.49,
          section: "main" }),
        knex('item').insert({
          id: 7,
          name: 'Heavvy Burger',
          price: 8.99,
          section: "main" }),
        knex('item').insert({
          id: 8,
          name: 'Gravy',
          price: 1.29,
          section: "side" }),
        knex('item').insert({
          id: 9,
          name: 'Fresh Cut Fries',
          price: 5.99,
          section: "side" }),
        knex('item').insert({
          id: 10,
          name: 'Poutine',
          price: 6.99,
          section: "side" }),
        knex('item').insert({
          id: 11,
          name: 'Cheese Fries',
          price: 5.99,
          section: "side" }),
        knex('item').insert({
          id: 12,
          name: 'Orange Juice',
          price: 1.99,
          section: "drink" }),
        knex('item').insert({
          id: 13,
          name: 'Pop',
          price: 1.69,
          section: "drink" }),
        knex('item').insert({
          id: 14,
          name: 'Bottled Water',
          price: 1.69,
          section: "drink" }),
        knex('item').insert({
          id: 15,
          name: 'Milk Shake',
          price: 4.99,
          section: "drink" })
      ])
    );
};
