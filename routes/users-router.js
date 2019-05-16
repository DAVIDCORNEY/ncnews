const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/users");
const { methodNotAllowed } = require("../errors");
usersRouter
  .route("/:username")
  .get(getUsersByUsername)
  .all(methodNotAllowed);
module.exports = usersRouter;
