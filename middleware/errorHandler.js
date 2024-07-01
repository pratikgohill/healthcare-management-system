const { logError } = require("../controller/logs");

module.exports = (err, req, res, next) => {
  console.error(err);
  logError(err);

  res.status(500).send("Something went wrong");
};
