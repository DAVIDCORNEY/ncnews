const { fetchArticles } = require("../models/articles");
exports.getArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      console.log({ articles });
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
