const connection = require("../db/connection");
exports.fetchArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where("articles.author", "like", author);
      if (topic) query.where("articles.topic", "like", topic);
    });
};

exports.fetchArticleById = ({ id }) => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .where("articles.article_id", id);
};

exports.updateArticle = ({ id }, { inc_votes }) => {
  return connection
    .select("*")
    .from("articles")
    .where("articles.article_id", id)
    .increment("votes", inc_votes)
    .returning("*");
};

exports.fetchArticleComments = ({ id }) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.article_id", "=", id)
    .returning("*");
};
