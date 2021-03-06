exports.up = function(knex, Promise) {
  console.log("creating topics table");
  return knex.schema.createTable("topics", topics => {
    topics.string("slug").primary();
    topics.string("description").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing topics table");
  return knex.schema.dropTable("topics");
};
