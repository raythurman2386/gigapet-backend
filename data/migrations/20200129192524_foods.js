exports.up = async function(knex) {
  await knex.schema.createTable("foods", tbl => {
    tbl.increments("id");
    tbl.string("name").notNullable();
    tbl.timestamps(true, true);
    tbl
      .integer("child_id")
      .notNullable()
      .references("id")
      .inTable("child")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("type").notNullable();
    tbl.integer("servings").notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("foods");
};
