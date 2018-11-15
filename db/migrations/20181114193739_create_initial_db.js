exports.up = async function(knex, Promise) {

  await Promise.all([
    knex.schema.createTable('item', function(table){
      table.increments('id').unsigned().primary();
      table.string('name');
      table.string('description');
      table.integer('price');
      table.string('section');
    }),

    knex.schema.createTable('order', function(table){
      table.increments('id').unsigned().primary();
      table.string('phone_number');
      table.string('status');
    }),

  ])

  await knex.schema.createTable('orderitem', function(table){
          table.increments('id').unsigned().primary();
          table.integer('order_id').unsigned().notNullable();
          table.integer('item_id').unsigned().notNullable();
          table.integer('quantity');
          table.foreign('order_id').references('id').inTable('order');
          table.foreign('item_id').references('id').inTable('item');
    })
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('orderitem');
  await knex.schema.dropTable('item');
  await knex.schema.dropTable('order');
};



