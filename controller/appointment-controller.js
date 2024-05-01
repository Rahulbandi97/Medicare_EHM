const Appointment = require("../model/Appointment");

const getAllAppointments = async (req, res, next) => {
  let appointments
  try {
    //const appointments = await Appointment.find().populate('PatientID').populate('ProviderID').populate('StaffID');   
    // appointments = await Appointment.find().populate('PatientID').populate('ProviderID').populate('StaffID');
    appointments = await Appointment.find();
  } catch (err) {
    return next(err);
  }
  if(!appointments){
    return res.status(500).json({message: "Internal server error"});
 }
 return res.status(200).json( appointments );
};

const addAppointment = async (req, res, next) => {
  const newAppointment = new Appointment(req.body);
  console.log(req.body);
  let savedAppointment;
  try {
    // const savedAppointment = await newAppointment.save();  
    // const convertedAppointmentID = new mongoose.Types.ObjectId(AppointmentID); 
    savedAppointment = await newAppointment.save();

  } catch (err) {
    return next(err);
  }
  
  if(!savedAppointment){
    return res.status(500).json({message: "Internal server error"});
 }
 return res.status(201).json({ appointment: savedAppointment });
};

const updateAppointment = async (req, res, next) => {
  // const { id } = req.params;
  const id = req.params.id;
  const _id = await Appointment.findOne({ "AppointmentID": id }).select('_id');

  let updatedAppointment

  try {
    // const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    updatedAppointment = await Appointment.findByIdAndUpdate(_id, req.body, { new: true });
    
  } catch (err) {
    return next(err);
  }

  if (!updatedAppointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }
  return res.status(200).json({ appointment: updatedAppointment });
};

const deleteAppointment = async (req, res, next) => {
  // const { id } = req.params;
  const id = req.params.id;
  const _id = await Appointment.findOne({ "AppointmentID": id }).select('_id');

  let deletedAppointment
  try {
    // const deletedAppointment = await Appointment.findByIdAndDelete(id);
    deletedAppointment = await Appointment.findByIdAndDelete(_id);
    
  } catch (err) {
    return next(err);
  }
  if (!deletedAppointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }

  return res.status(200).json({ message: "Appointment deleted successfully." });

};

const getAppointmentById = async (req, res, next) => {
  // const { id } = req.params;
  const id = req.params.id;
  const _id = await Appointment.findOne({ "AppointmentID": id }).select('_id');
  let appointment;
  try {
    //const appointment = await Appointment.findById(id).populate('PatientID').populate('ProviderID').populate('StaffID');
    appointment = await Appointment.findById(_id).populate('PatientID').populate('ProviderID').populate('StaffID');
  } catch (err) {
    return next(err);
  }
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }
  return res.status(200).json({ appointment });
};

exports.getAllAppointments = getAllAppointments;
exports.addAppointment = addAppointment;
exports.updateAppointment = updateAppointment;
exports.deleteAppointment = deleteAppointment;
exports.getAppointmentById = getAppointmentById;
