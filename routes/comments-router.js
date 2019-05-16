const commentsRouter = require("express").Router();
const { patchComment, deleteHouseById } = require("../controllers/comments");
commentsRouter
  .route("/:id")
  .patch(patchComment)
  .delete(deleteHouseById);

module.exports = commentsRouter;
