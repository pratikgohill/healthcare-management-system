const { logError } = require("../controller/logs");

module.exports = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logError("Access Denied");

      return res
        .status(403)
        .json({ error: `Access Denied for ${req.user.role} role` });
    }
    next();
  };
};
