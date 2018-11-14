exports.seed = function(knex, Promise) {
  return knex('item')
    .del()
    .then(() =>
      Promise.all([
        knex('item').insert({
          id: 1,
          name: 'Hamburger',
          price: 5.99,
          description: "Something",
          section: "main"}),
        knex('item').insert({
          id: 2,
          name: 'Cheeseburger',
          description: "Something",
          price: 6.29,
          section: "main" }),
        knex('item').insert({
          id: 3,
          name: 'Bacon Cheeseburger',
          description: "Something",
          price: 7.99,
          section: "main" }),
        knex('item').insert({
          id: 4,
          name: 'Chicken Strips',
          description: "Something",
          price: 5.99,
          section: "main" }),
        knex('item').insert({
          id: 5,
          name: 'Chicken Bacon Ranch',
          description: "Something",
          price: 8.29,
          section: "main" }),
        knex('item').insert({
          id: 6,
          name: 'Holy Smokes Burger',
          description: "Something",
          price: 10.49,
          section: "main" }),
        knex('item').insert({
          id: 7,
          name: 'Heavvy Burger',
          description: "Something",
          price: 8.99,
          section: "main" }),
        knex('item').insert({
          id: 8,
          name: 'Gravy',
          description: "Something",
          price: 1.29,
          section: "side" }),
        knex('item').insert({
          id: 9,
          name: 'Fresh Cut Fries',
          description: "Something",
          price: 5.99,
          section: "side" }),
        knex('item').insert({
          id: 10,
          name: 'Poutine',
          description: "Something",
          price: 6.99,
          section: "side" }),
        knex('item').insert({
          id: 11,
          name: 'Cheese Fries',
          description: "Something",
          price: 5.99,
          section: "side" }),
        knex('item').insert({
          id: 12,
          name: 'Orange Juice',
          description: "Something",
          price: 1.99,
          section: "drink" }),
        knex('item').insert({
          id: 13,
          name: 'Pop',
          description: "Something",
          price: 1.69,
          section: "drink" }),
        knex('item').insert({
          id: 14,
          name: 'Bottled Water',
          description: "Something",
          price: 1.69,
          section: "drink" }),
        knex('item').insert({
          id: 15,
          name: 'Milk Shake',
          description: "Something",
          price: 4.99,
          section: "drink" })
      ])
    );
};
