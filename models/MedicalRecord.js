const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  filePath: { type: String },
  fileData: { type: Array },
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);
