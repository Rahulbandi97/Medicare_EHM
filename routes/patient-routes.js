const express = require("express");
const {
  getAllPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientById
} = require("../controller/patient-controller");

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", addPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
router.get("/:id", getPatientById);

module.exports = router;