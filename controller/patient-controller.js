const mongoose = require("mongoose");
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");
const EMR = require("../model/EMR"); 
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());



const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json( patients );
  } catch (err) {
    next(err);
  }
};

const addPatient = async (req, res, next) => {
  const newPatient = new Patient(req.body);
  try {  
    const savedPatient = await newPatient.save();
    res.status(201).json({ patient: savedPatient });
  } catch (err) {
    next(err);
  }
};

const updatePatient = async (req, res, next) => {
  const id = req.params.id;
  const _id = await Patient.findOne({ "PatientID": id }).select('_id');
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json({ patient: updatedPatient });
  } catch (err) {
    next(err);
  }
};

const deletePatient = async (req, res, next) => {
  //BOC vikram
  const { id } = req.params;
  // const patient = req.params;
  const _id = await Patient.findOne({ "PatientID": id }).select('_id');
  //EOC vikram
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const deletedPatient = await Patient.findByIdAndDelete(_id, { session });
    //BOC vikram
    // const patientcstID = await Patient.findById(id).select('PatientID');/
    // patientcstID = id;
    //EOC vikram
    if (!deletedPatient) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Patient not found." });
    }

    // Deleting related appointments
    //BOC vikram
    // const deleteAppointmentsResult = await Appointment.deleteMany({ PatientID: patientcstID.PatientID }, { session });
    const deleteAppointmentsResult = await Appointment.deleteMany({ PatientID: id }, { session });
    //EOC Vikram
    console.log(`Deleted ${deleteAppointmentsResult.deletedCount} appointment(s).`);

    // Deleting related EMRs
    //BOC vikram
    const deleteEmrResult = await EMR.deleteMany({ PatientID: id }, { session });
    //EOC vikram
    console.log(`Deleted ${deleteEmrResult.deletedCount} EMR entry(ies).`);

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Patient and related records deleted successfully." });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
  // const { id } = req.params;
  // try {
  //   const deletedPatient = await Patient.findByIdAndDelete(id);
  //   if (!deletedPatient) {
  //     return res.status(404).json({ message: "Patient not found." });
  //   }
  //   res.status(200).json({ message: "Patient deleted successfully." });
  // } catch (err) {
  //   next(err);
  // }
};

const getPatientById = async (req, res, next) => {
  const id = req.params;
  const _id = await Patient.findOne({ "PatientID": id }).select('_id');
  try {
    const patient = await Patient.findById(_id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json({ patient });
  } catch (err) {
    next(err);
  }
};

exports.getAllPatients = getAllPatients;
exports.addPatient = addPatient;
exports.updatePatient = updatePatient;
exports.deletePatient = deletePatient;
exports.getPatientById = getPatientById;
