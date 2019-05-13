exports.up = function(knex, Promise) {
  console.log("creating users table");
  return knex.schema.createTable("users", users => {
    users
      .string("username")
      .unique()
      .primary();
    users.string("avatar_url").notNullable();
    users.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing users table");
  return knex.schema.dropTable("users");
};
