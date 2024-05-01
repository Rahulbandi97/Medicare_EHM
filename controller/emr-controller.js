const EMR = require("../model/EMR");

const getAllEMRs = async (req, res, next) => {
  let emrs;
  try {
    // const emrs = await EMR.find().populate('PatientID').populate('ProviderID').populate('StaffID');
    // emrs = await EMR.find().populate('PatientID').populate('ProviderID').populate('StaffID');
    emrs = await EMR.find();
  } catch (err) {
    return next(err);
  }
  if(!emrs){
    return res.status(500).json({message: "Internal server error"});
  }
  return res.status(200).json( emrs );
};

const addEMR = async (req, res, next) => {
  const newEMR = new EMR(req.body);
  let savedEMR;
  try {
    // const savedEMR = await newEMR.save();
    savedEMR = await newEMR.save();
  } catch (err) {
    return next(err);
  }
  if(!savedEMR){
    return res.status(500).json({message:"Unable to save EMR"});
 }
  return res.status(201).json({ emr: savedEMR });
};

const updateEMR = async (req, res, next) => {
  // const { id } = req.params;
  const id = req.params.id;
  const _id = await EMR.findOne({ "RecordID": id }).select('_id');
  let updatedEMR;
  try {
    //const updatedEMR = await EMR.findByIdAndUpdate(id, req.body, { new: true });
    updatedEMR = await EMR.findByIdAndUpdate(_id, req.body, { new: true });
  } catch (err) {
    return next(err);
  }
  if (!updatedEMR) {
    return res.status(404).json({ message: "EMR not found." });
  }
  return res.status(200).json({ emr: updatedEMR });
};

const deleteEMR = async (req, res, next) => {
  const id = req.params.id;
  const _id = await EMR.findOne({ "RecordID": id }).select('_id');
  try {
    const deletedEMR = await EMR.findByIdAndDelete(_id);
    if (!deletedEMR) {
      return res.status(404).json({ message: "EMR not found." });
    }
    res.status(200).json({ message: "EMR deleted successfully." });
  } catch (err) {
    next(err);
  }
};

const getEMRById = async (req, res, next) => {
  const id = req.params.id;
  const _id = await EMR.findOne({ "RecordID": id }).select('_id');
  try {
    const emr = await EMR.findById(_id).populate('PatientID').populate('ProviderID').populate('StaffID');
    if (!emr) {
      return res.status(404).json({ message: "EMR not found." });
    }
    res.status(200).json({ emr });
  } catch (err) {
    next(err);
  }
};

exports.getAllEMRs = getAllEMRs;
exports.addEMR = addEMR;
exports.updateEMR = updateEMR;
exports.deleteEMR = deleteEMR;
exports.getEMRById = getEMRById;
