exports.seed = function(knex, Promise) {
  return knex('item')
    .del()
    .then(() =>
      Promise.all([
        knex('item').insert({
          name: 'Hamburger',
          price: 5.99,
          description: "Something",
          section: "main"}),
        knex('item').insert({
          name: 'Cheeseburger',
          description: "Something",
          price: 6.29,
          section: "main" }),
        knex('item').insert({
          name: 'Bacon Cheeseburger',
          description: "Something",
          price: 7.99,
          section: "main" }),
        knex('item').insert({
          name: 'Chicken Strips',
          description: "Something",
          price: 5.99,
          section: "main" }),
        knex('item').insert({
          name: 'Chicken Bacon Ranch',
          description: "Something",
          price: 8.29,
          section: "main" }),
        knex('item').insert({
          name: 'Holy Smokes Burger',
          description: "Something",
          price: 10.49,
          section: "main" }),
        knex('item').insert({
          name: 'Heavvy Burger',
          description: "Something",
          price: 8.99,
          section: "main" }),
        knex('item').insert({
          name: 'Gravy',
          description: "Something",
          price: 1.29,
          section: "side" }),
        knex('item').insert({
          name: 'Fresh Cut Fries',
          description: "Something",
          price: 5.99,
          section: "side" }),
        knex('item').insert({
          name: 'Poutine',
          description: "Something",
          price: 6.99,
          section: "side" }),
        knex('item').insert({
          name: 'Cheese Fries',
          description: "Something",
          price: 5.99,
          section: "side" }),
        knex('item').insert({
          name: 'Orange Juice',
          description: "Something",
          price: 1.99,
          section: "drink" }),
        knex('item').insert({
          name: 'Pop',
          description: "Something",
          price: 1.69,
          section: "drink" }),
        knex('item').insert({
          name: 'Bottled Water',
          description: "Something",
          price: 1.69,
          section: "drink" }),
        knex('item').insert({
          name: 'Milk Shake',
          description: "Something",
          price: 4.99,
          section: "drink" })
      ])
    );
};
