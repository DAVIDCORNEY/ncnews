exports.up = function(knex, Promise) {
  console.log("creating comments table");
  return knex.schema.createTable("comments", comments => {
    comments.increments("comment_id").primary();
    comments.string("author");
    comments.foreign("author").references("users.username");
    comments.integer("article_id");
    comments.foreign("article_id").references("articles.article_id");
    comments.integer("votes").defaultTo(0);
    comments.date("created_at");
    comments.text("body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing comments table");
  return knex.schema.dropTable("comments");
};
