const express = require("express");
const authorization = require("../middleware/authorization");
const role = require("../middleware/role");
const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controller/patients");
const router = express.Router();

router.post("/", [authorization, role(["Admin", "Doctor"])], addPatient);

router.get("/", [authorization, role(["Admin", "Doctor"])], getPatients);

router.get("/:id", [authorization, role(["Admin", "Doctor"])], getPatientById);

router.put("/:id", [authorization, role(["Admin", "Doctor"])], updatePatient);

router.delete("/:id", [authorization, role(["Admin"])], deletePatient);

module.exports = router;
