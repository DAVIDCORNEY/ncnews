const { updateComment } = require("../models/comments");

exports.patchComment = (req, res, next) => {
  updateComment(req.params, req.body)
    .then(comment => {
      console.log({ comment });
      res.status(200).send({ comment });
    })
    .catch(next);
};
