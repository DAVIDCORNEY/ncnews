const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticle
} = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:id")
  .get(getArticleById)
  .patch(patchArticle);

module.exports = articlesRouter;
