const express = require("express");
const authorization = require("../middleware/authorization");
const role = require("../middleware/role");
const multer = require("multer");
const {
  deleteMedicalRecord,
  addMedicalRecord,
  getMedicalRecord,
  getMedicalRecordById,
} = require("../controller/medicalData");
const router = express.Router();
const fs = require("fs");
const { logError } = require("../controller/logs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "uploads/";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log("file ", file.mimetype);
    if (
      file.mimetype === "text/csv" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return cb(null, true);
    } else {
      logError("Wrong file type");

      return cb(new Error("Wrong file type"));
    }
  },
});

router.post(
  "/:id/medical-data",
  [authorization, role(["Doctor"])],
  upload.single("file"),
  addMedicalRecord
);

router.get(
  "/:id/medical-data",
  [authorization, role(["Admin", "Doctor"])],
  getMedicalRecord
);

router.get(
  "/:id/medical-data/:recordId",
  [authorization, role(["Admin", "Doctor"])],
  getMedicalRecordById
);

router.delete(
  "/:id/medical-data/:recordId",
  [authorization, role(["Admin", "Doctor"])],
  deleteMedicalRecord
);

module.exports = router;
