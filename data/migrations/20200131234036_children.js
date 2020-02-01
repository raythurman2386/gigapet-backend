exports.up = async function(knex) {
  await knex.schema.createTable('child', tbl => {
    tbl.increments('id')
    tbl.string('name', 128).notNullable()
    tbl.integer('monster_id').notNullable()
    tbl
      .integer('parent_id')
      .unsigned()
      .references('id')
      .inTable('parents')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl
      .integer('co_parent_id')
      .unsigned()
      .references('id')
      .inTable('parents')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('child')
}
