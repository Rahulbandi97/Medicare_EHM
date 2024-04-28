const express = require("express");
const {
  getAllAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById
} = require("../controller/appointment-controller");

const router = express.Router();

router.get("/", getAllAppointments);
router.post("/", addAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/:id", getAppointmentById);

module.exports = router;
