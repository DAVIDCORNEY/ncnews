const { fetchUserByUsername } = require("../models/users");

exports.getUsersByUsername = (req, res, next) => {
  fetchUserByUsername(req.params)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "Route Not Found"
        });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
