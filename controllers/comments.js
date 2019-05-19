const { updateComment, removeCommentById } = require("../models/comments");

exports.patchComment = (req, res, next) => {
  updateComment(req.params, req.body)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "Route Not Found"
        });
      } else {
        res.status(200).send({ comment });
      }
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  removeCommentById(req.params)
    .then(result => {
      if (!result) {
        return Promise.reject({
          status: 404,
          msg: "Route Not Found"
        });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(next);
};
