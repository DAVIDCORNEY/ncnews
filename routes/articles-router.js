const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticle,
  getArticleComments,
  postArticleComment
} = require("../controllers/articles");
const { methodNotAllowed } = require("../errors");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:id")
  .get(getArticleById)
  .patch(patchArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:id/comments")
  .get(getArticleComments)
  .post(postArticleComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
