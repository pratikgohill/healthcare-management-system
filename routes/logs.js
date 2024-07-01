const express = require("express");
const authorization = require("../middleware/authorization");
const role = require("../middleware/role");
const { fetchLogs, fetchErros } = require("../controller/logs");

const router = express.Router();

router.get("/", [authorization, role(["Admin"])], fetchLogs);
router.get("/errors", [authorization, role(["Admin"])], fetchErros);

module.exports = router;
