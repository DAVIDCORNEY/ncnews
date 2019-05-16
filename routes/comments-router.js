const commentsRouter = require("express").Router();
const { patchComment } = require("../controllers/comments");
commentsRouter.route("/:id").patch(patchComment);

module.exports = commentsRouter;
