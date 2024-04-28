const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emrSchema = new Schema({
  RecordID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    unique: true
  },
  PatientID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Patient',
    required: true
  },
  ProviderID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'HealthcareProvider',
    required: true
  },
  StaffID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Staff',
    required: true
  },
  DateCreated: {
    type: Date,
    default: Date.now
  },
  VitalSigns: {
    HeartRate: Number,
    BloodPressure: String,
    BodyTemperature: Number,
    OxygenSaturation: Number
  },
  MedicalNotes: String,
  Diagnoses: [String],
  Treatments: [String],
  Medications: [String],
  ImmunizationDates: [Date],
  RadiologyImages: [String], // Assuming handling with GridFS is implemented elsewhere
  LabTestResults: [String]
}, { timestamps: true });

module.exports = mongoose.model("EMR", emrSchema);
