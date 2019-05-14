const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");
const { methodNotAllowed } = require("../errors");

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
