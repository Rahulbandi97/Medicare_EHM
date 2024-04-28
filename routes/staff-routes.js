const express = require("express");
const {
  getAllStaffMembers,
  addStaffMember,
  updateStaffMember,
  deleteStaffMember,
  getStaffMemberById
} = require("../controller/staff-controller");

const router = express.Router();

router.get("/", getAllStaffMembers);
router.post("/", addStaffMember);
router.put("/:id", updateStaffMember);
router.delete("/:id", deleteStaffMember);
router.get("/:id", getStaffMemberById);

module.exports = router;
