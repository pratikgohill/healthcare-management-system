const Patient = require("../models/Patient");
const { logError } = require("./logs");

const addPatient = async (req, res) => {
  const { firstName, lastName, dob } = req.body;
  try {
    const patient = new Patient({
      firstName,
      lastName,
      dob,
      createdBy: req.user.id,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    logError(err);

    res.status(400).json({ error: err.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "medicalHistory"
    );

    if (!patient) {
      logError("Patient not found");

      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) {
      logError("Patient not found");

      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      logError("Patient not found");

      return res.status(404).json({ error: "Patient not found" });
    }
    res.send("Patient deleted successfully");
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
