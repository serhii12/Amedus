exports.up = async function(knex, Promise) {

  await Promise.all([
    knex.schema.createTable('item', function(table){
      table.increments('id').unsigned().primary();
      table.text('name');
      table.text('description');
      table.decimal('price');
      table.text('section');
    }),

    knex.schema.createTable('order', function(table){
      table.increments('id').unsigned().primary();
      table.text('phone_number');
      table.text("status");
    }),

  ])

  await knex.schema.createTable('orderitem', function(table){
          table.increments('id').unsigned().primary();
          table.integer('order_id').references('order.id');
          table.integer('item_id').references('item.id');
          table.integer('quantity');
    })
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('orderitem');
  await knex.schema.dropTable('item');
  await knex.schema.dropTable('order');
};



