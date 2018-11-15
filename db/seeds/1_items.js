exports.seed = function(knex, Promise) {
  return knex('item')
    .del()
    .then(() =>
      Promise.all([
        knex('item').insert({
          name: 'Hamburger',
          price: 599,
          description: "Something",
          section: "main"}),
        knex('item').insert({
          name: 'Cheeseburger',
          description: "Something",
          price: 629,
          section: "main" }),
        knex('item').insert({
          name: 'Bacon Cheeseburger',
          description: "Something",
          price: 799,
          section: "main" }),
        knex('item').insert({
          name: 'Chicken Strips',
          description: "Something",
          price: 599,
          section: "main" }),
        knex('item').insert({
          name: 'Chicken Bacon Ranch',
          description: "Something",
          price: 829,
          section: "main" }),
        knex('item').insert({
          name: 'Holy Smokes Burger',
          description: "Something",
          price: 1049,
          section: "main" }),
        knex('item').insert({
          name: 'Heavvy Burger',
          description: "Something",
          price: 899,
          section: "main" }),
        knex('item').insert({
          name: 'Gravy',
          description: "Something",
          price: 129,
          section: "side" }),
        knex('item').insert({
          name: 'Fresh Cut Fries',
          description: "Something",
          price: 599,
          section: "side" }),
        knex('item').insert({
          name: 'Poutine',
          description: "Something",
          price: 699,
          section: "side" }),
        knex('item').insert({
          name: 'Cheese Fries',
          description: "Something",
          price: 599,
          section: "side" }),
        knex('item').insert({
          name: 'Orange Juice',
          description: "Something",
          price: 199,
          section: "drink" }),
        knex('item').insert({
          name: 'Pop',
          description: "Something",
          price: 169,
          section: "drink" }),
        knex('item').insert({
          name: 'Bottled Water',
          description: "Something",
          price: 169,
          section: "drink" }),
        knex('item').insert({
          name: 'Milk Shake',
          description: "Something",
          price: 499,
          section: "drink" })
      ])
    );
};
