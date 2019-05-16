const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/users");
usersRouter.route("/:username").get(getUsersByUsername);
module.exports = usersRouter;
