exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle400 = (err, req, res, next) => {
  const codes = {
    "42703": "Bad request: Column does not exist",
    "22P02": "Bad request: Invalid Input Syntax for Type Integer",
    "23502": "Bad Request: null value in column violates not-null constraint"
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Route Not Found" });
  } else {
    next(err);
  }
};

exports.handle422 = (err, req, res, next) => {
  const codes = {
    "23503":
      "Unprocessable Entity:POST contains a valid article ID that does not exist"
  };
  if (codes[err.code]) res.status(422).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
