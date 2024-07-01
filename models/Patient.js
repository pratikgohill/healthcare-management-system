const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  medicalHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
