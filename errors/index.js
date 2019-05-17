exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle400 = (err, req, res, next) => {
  const psqlCodes = ["42703"];
  console.log(err);
  if (err.status === 400)
    res.status(400).send({ msg: "Bad request: Column does not exist" });
  if (psqlCodes.includes(err.code))
    res.status(400).send({ msg: "Bad request: Column does not exist" });
  else {
    next(err);
  }
};

exports.handle404 = (err, req, res, next) => {
  console.log(err);
  if (err.status === 404) {
    res.status(404).send({ msg: "Route Not Found" });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
