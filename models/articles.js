const connection = require("../db/connection");
exports.fetchArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic,
  limit = 250
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
    .limit(limit)
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

exports.updateArticle = ({ id }, { inc_votes = 0 }) => {
  return connection
    .select("*")
    .from("articles")
    .where("articles.article_id", id)
    .increment("votes", inc_votes)
    .returning("*");
};

exports.fetchArticleComments = (
  { id },
  { sort_by = "created_at", order = "desc" }
) => {
  return connection
    .select(
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("comments")
    .where("comments.article_id", "=", id)
    .orderBy(sort_by, order)
    .returning("*");
};

exports.insertArticleComment = ({ id }, comment) => {
  const newObj = {
    author: comment.username,
    body: comment.body,
    article_id: id
  };

  return connection("comments")
    .insert(newObj)
    .returning("*");
};
