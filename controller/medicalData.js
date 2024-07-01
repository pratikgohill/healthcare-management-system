const Patient = require("../models/Patient");
const MedicalRecord = require("../models/MedicalRecord");
const { logError } = require("./logs");
const fs = require("fs");
const { parse } = require("csv-parse");

const addMedicalRecord = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      logError("Patient not found");

      return res.status(404).json({ error: "Patient not found" });
    }

    const medicalRecord = new MedicalRecord({
      date: new Date(),
      description: req.body.description,
    });

    if (req.file && req.file.path) {
      medicalRecord.filePath = req.file.path;
      var csvData = [];
      fs.createReadStream(req.file.path)
        .pipe(parse({ separator: ";" }))
        .on("data", function (csvrow) {
          //do something with csvrow
          csvData.push(csvrow);
          medicalRecord.fileData.push(csvrow);
        })
        .on("end", function () {
          //do something with csvData
          console.log(csvData);
        });
      console.log("new data : ", csvData);
    }

    await medicalRecord.save();
    patient.medicalHistory.push(medicalRecord._id);
    await patient.save();
    res.status(201).json(medicalRecord);
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

const getMedicalRecord = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "medicalHistory"
    );
    if (!patient) {
      logError("Patient not found");

      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient.medicalHistory);
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

const getMedicalRecordById = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.recordId);
    if (!medicalRecord) {
      logError("Medical record not found");

      return res.status(404).json({ error: "Medical record not found" });
    }
    res.json(medicalRecord);
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

const deleteMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findByIdAndDelete(
      req.params.recordId
    );
    if (!medicalRecord) {
      logError("Medical record not found");

      return res.status(404).json({ error: "Medical record not found" });
    }
    res.send("Medical record deleted successfully");
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addMedicalRecord,
  getMedicalRecord,
  getMedicalRecordById,
  deleteMedicalRecord,
};
