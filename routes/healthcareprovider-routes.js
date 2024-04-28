const express = require("express");
const {
  getAllHealthcareProviders,
  addHealthcareProvider,
  updateHealthcareProvider,
  deleteHealthcareProvider,
  getHealthcareProviderById
} = require("../controller/healthcareprovider-controller");

const router = express.Router();

router.get("/", getAllHealthcareProviders);
router.post("/", addHealthcareProvider);
router.put("/:id", updateHealthcareProvider);
router.delete("/:id", deleteHealthcareProvider);
router.get("/:id", getHealthcareProviderById);

module.exports = router;
