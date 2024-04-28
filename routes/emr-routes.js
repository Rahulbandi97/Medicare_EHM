const express = require("express");
const {
  getAllEMRs,
  addEMR,
  updateEMR,
  deleteEMR,
  getEMRById
} = require("../controller/emr-controller");

const router = express.Router();

router.get("/", getAllEMRs);
router.post("/", addEMR);
router.put("/:id", updateEMR);
router.delete("/:id", deleteEMR);
router.get("/:id", getEMRById);

module.exports = router;
