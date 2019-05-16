const commentsRouter = require("express").Router();
const { patchComment, deleteCommentById } = require("../controllers/comments");
const { methodNotAllowed } = require("../errors");
commentsRouter
  .route("/:id")
  .patch(patchComment)
  .delete(deleteCommentById)
  .all(methodNotAllowed);

module.exports = commentsRouter;
