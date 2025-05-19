const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error creating complaint", error });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaint", error });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ message: "Not found" });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error updating complaint", error });
  }
};

exports.queryComplaints = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  try {
    const complaints = await Complaint.find({
      $or: [{ _id: query }, { email: query }],
    });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
