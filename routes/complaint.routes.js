const express = require("express");
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  queryComplaints,
} = require("../controllers/complaint.controller");

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintById);
router.put("/:id", updateComplaint);
router.get("/status", queryComplaints);

module.exports = router;
