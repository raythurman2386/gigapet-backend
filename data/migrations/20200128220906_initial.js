
exports.up = async function(knex) {
  await knex.schema.createTable('parents', tbl => {
    tbl.increments('id');
    tbl.string('username', 128).unique().notNullable();
    tbl.string('password', 128).notNullable();
    tbl.string('email', 128).unique().notNullable()
  });
  await knex.schema.createTable('child', tbl => {
    tbl.increments('id');
    tbl.string('name', 128).notNullable();
    tbl.integer('parent_id')
      .unsigned()
      .references('id')
      .inTable('parents')
      .onDelete('CASCADE')
      .onUpdate("CASCADE");
    tbl.integer('co_parent_id')
       .unsigned()
       .references('id')
       .inTable('parents')
       .onDelete('CASCADE')
       .onUpdate("CASCADE")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('child');
  await knex.schema.dropTableIfExists('parents');
};
