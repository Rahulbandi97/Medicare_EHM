const Patient = require("../model/Patient");

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ patients });
  } catch (err) {
    next(err);
  }
};

const addPatient = async (req, res, next) => {
  //const { firstName, lastName, ...restOfDetails } = req.body;
  // console.log(firstName)
  // if (!firstName || !lastName) {
  //   return res.status(422).json({ message: "First name and last name are required." });
  // }
  const newPatient = new Patient(req.body);
  try {  
    const savedPatient = await newPatient.save();
    res.status(201).json({ patient: savedPatient });
  } catch (err) {
    next(err);
  }
};

const updatePatient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json({ patient: updatedPatient });
  } catch (err) {
    next(err);
  }
};

const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json({ message: "Patient deleted successfully." });
  } catch (err) {
    next(err);
  }
};

const getPatientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
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
