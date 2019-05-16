const { updateComment, removeHouseById } = require("../models/comments");

exports.patchComment = (req, res, next) => {
  updateComment(req.params, req.body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteHouseById = (req, res, next) => {
  removeHouseById(req.params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(next);
};
