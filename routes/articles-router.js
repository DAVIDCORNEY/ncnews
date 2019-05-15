const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticle,
  getArticleComments
} = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:id")
  .get(getArticleById)
  .patch(patchArticle);

articlesRouter.route("/:id/comments").get(getArticleComments);

module.exports = articlesRouter;
