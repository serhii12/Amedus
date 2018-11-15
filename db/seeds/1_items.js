exports.seed = function(knex, Promise) {
  return knex('item')
    .del()
    .then(() =>
      Promise.all([
        knex('item').insert({
          name: 'Hamburger',
          price: 599,
          description: "Premium beef patty topped the way you like it.",
          section: "main"}),
        knex('item').insert({
          name: 'Cheeseburger',
          description: "Premium beef patty with cheese.",
          price: 629,
          section: "main" }),
        knex('item').insert({
          name: 'Bacon Cheeseburger',
          description: "Cheeseburger topped with crisp bacon.",
          price: 799,
          section: "main" }),
        knex('item').insert({
          name: 'Chicken Strips',
          description: "Hand-breaded fried chicken strips served with either our G14 or BBQ sauce.",
          price: 599,
          section: "main" }),
        knex('item').insert({
          name: 'Chicken Bacon Ranch',
          description: "A freshly hand-breaded fried chicken sandwich with buttermilk ranch, Swiss cheese, lettuce & crispy bacon.",
          price: 829,
          section: "main" }),
        knex('item').insert({
          name: 'Holy Smokes Burger',
          description: "Double cheeseburger topped with panko-crusted deep-fried jalapeños.",
          price: 1049,
          section: "main" }),
        knex('item').insert({
          name: 'Heavvy Burger',
          description: "Secret sauce, diced onions, shredded lettuce, pickles, deep fried jalapeño smoke & bacon.",
          price: 899,
          section: "main" }),
        knex('item').insert({
          name: 'Gravy',
          description: "Add a complement to your meal.",
          price: 129,
          section: "side" }),
        knex('item').insert({
          name: 'Fresh Cut Fries',
          description: "Choice of adding gravy.",
          price: 599,
          section: "side" }),
        knex('item').insert({
          name: 'Poutine',
          description: "",
          price: 699,
          section: "side" }),
        knex('item').insert({
          name: 'Cheese Fries',
          description: "Fresh cut fries topped with shredded cheese.",
          price: 599,
          section: "side" }),
        knex('item').insert({
          name: 'Orange Juice',
          description: "",
          price: 199,
          section: "drink" }),
        knex('item').insert({
          name: 'Pop',
          description: "",
          price: 169,
          section: "drink" }),
        knex('item').insert({
          name: 'Bottled Water',
          description: "",
          price: 169,
          section: "drink" }),
        knex('item').insert({
          name: 'Milk Shake',
          description: "The name says it all.",
          price: 499,
          section: "drink" })
      ])
    );
};
