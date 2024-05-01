const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Patient = require('../model/Patient');
const HealthCareProvider = require('../model/HealthCareProvider');
const Staff = require('../model/Staff');

const emrSchema = new Schema({
  RecordID: {
    type: String,
    required: true,
    unique: true
  },
  PatientID: {
    type: String,
    ref: 'Patient',
    required: true
  },
  ProviderID: {
    type: String,
    ref: 'HealthCareProvider',
    required: true
  },
  StaffID: {
    type: String,
    ref: 'Staff',
    required: true
  },
  DateCreated: {
    type: Date,
    default: Date.now
  },
  VitalSigns: {
    HeartRate: String,
    BloodPressure: String,
    BodyTemperature: String,
    OxygenSaturation: String
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
