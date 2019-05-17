exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle400 = (err, req, res, next) => {
  console.log(err);
  if (err) {
    res.status(400).send({ msg: "Bad request: Column does not exist" });
  } else {
    next(err);
  }
};

exports.handle404 = (err, req, res, next) => {
  console.log(err);
  if (err) {
    res.status(404).send({ msg: "Route not found" });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
