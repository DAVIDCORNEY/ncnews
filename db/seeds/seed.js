const { topicData, userData, articleData, commentData } = require("../data");
const {
  formatDate,
  renameKeys,
  createRef,
  formatDateandKeys
} = require("../../utils/utils");

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
    })
    .then(articles => {
      const formatAuthor = renameKeys(commentData, "created_by", "author");
      const articleRef = createRef(articles, "title", "article_id");
      const formatted = formatDateandKeys(formatAuthor, articleRef);
      return knex("comments")
        .insert(formatted)
        .returning("*");
    });
};
