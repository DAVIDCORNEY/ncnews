const { topicData, userData, articleData } = require("../data");
const { formatDate } = require("../../utils/utils");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(userData)
        .returning("*");
    })
    .then(() => {
      const dateFormatted = formatDate(articleData);
      return knex("articles")
        .insert(dateFormatted)
        .returning("*");
    });
};
