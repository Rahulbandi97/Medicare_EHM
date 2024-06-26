const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Patient = require('../model/Patient');
const HealthCareProvider = require('../model/HealthCareProvider');
const Staff = require('../model/Staff');

const appointmentSchema = new Schema({
  AppointmentID: {
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
  AppointmentDate: {
    type: Date,
    required: true,
    min: Date.now
  },
  AppointmentTime: {
    type: String,
    required: true
  },
  Purpose: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true,
    enum: ['scheduled', 'completed', 'canceled']
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
