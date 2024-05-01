const Staff = require("../model/Staff");

const getAllStaffMembers = async (req, res, next) => {
  try {
    const staffMembers = await Staff.find();
    res.status(200).json( staffMembers );
  } catch (err) {
    next(err);
  }
};

const addStaffMember = async (req, res, next) => {
  try {
    const newStaffMember = new Staff(req.body);
    const savedStaffMember = await newStaffMember.save();
    res.status(201).json({ staffMember: savedStaffMember });
  } catch (err) {
    next(err);
  }
};

const updateStaffMember = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedStaffMember = await Staff.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStaffMember) {
      return res.status(404).json({ message: "Staff member not found." });
    }
    res.status(200).json({ staffMember: updatedStaffMember });
  } catch (err) {
    next(err);
  }
};

const deleteStaffMember = async (req, res, next) => {
  const id = req.params.id;
  // console.log('id', id);
  const _id = await Staff.findOne({ "StaffID": id }).select('_id');
  // console.log('_id', _id);
  let deletedStaffMember
  try {
    // const deletedStaffMember = await Staff.findByIdAndDelete(_id);
    deletedStaffMember = await Staff.findByIdAndDelete(_id);
    
  } catch (err) {
    next(err);
  }
  if (!deletedStaffMember) {
    return res.status(404).json({ message: "Staff member not found." });
  }
  res.status(200).json({ message: "Staff member deleted successfully." });
};

const getStaffMemberById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const staffMember = await Staff.findById(id);
    if (!staffMember) {
      return res.status(404).json({ message: "Staff member not found." });
    }
    res.status(200).json({ staffMember });
  } catch (err) {
    next(err);
  }
};

exports.getAllStaffMembers = getAllStaffMembers;
exports.addStaffMember = addStaffMember;
exports.updateStaffMember = updateStaffMember;
exports.deleteStaffMember = deleteStaffMember;
exports.getStaffMemberById = getStaffMemberById;
