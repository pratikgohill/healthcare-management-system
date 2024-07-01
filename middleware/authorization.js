const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { logError } = require("../controller/logs");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    logError("No token,authorization denied");

    return res.status(401).json({ error: "No token,authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    logError(err);

    console.log(err);
    res.status(401).json({ error: "Token is not valid" });
  }
};
