const { fetchUserByUsername } = require("../models/users");

exports.getUsersByUsername = (req, res, next) => {
  fetchUserByUsername(req.params)
    .then(user => {
      console.log({ user });
      res.status(200).send({ user });
    })
    .catch(next);
};
