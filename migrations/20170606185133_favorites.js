
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table){
  table.increments('id'),
  table.integer('book_id').notNullable().references('books.id').onDelete('cascade').onUpdate('cascade').index(),
  table.integer('user_id').notNullable().references('users.id').onDelete('cascade').onUpdate('cascade').index(),
  table.timestamps(true, true)
  });
};

exports.down = function(knex, Promise) {

};
