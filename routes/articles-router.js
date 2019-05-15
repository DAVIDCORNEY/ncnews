const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticle,
  getArticleComments,
  postArticleComment
} = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:id")
  .get(getArticleById)
  .patch(patchArticle);

articlesRouter
  .route("/:id/comments")
  .get(getArticleComments)
  .post(postArticleComment);

module.exports = articlesRouter;
