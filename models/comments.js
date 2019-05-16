const connection = require("../db/connection");
exports.updateComment = ({ id }, { inc_votes }) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", id)
    .increment("votes", inc_votes)
    .returning("*");
};

exports.removeHouseById = ({ id }) => {
  return connection("comments")
    .where("comments.comment_id", id)
    .del();
};
