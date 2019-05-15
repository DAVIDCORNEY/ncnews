const articlesRouter = require("express").Router();
const { getArticles, getArticleById } = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);

articlesRouter.route("/:id").get(getArticleById);

module.exports = articlesRouter;
