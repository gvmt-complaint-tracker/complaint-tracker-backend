const Complaint = require("../models/Complaint");
const { generateTicketId } = require("../utils/generateTicketId.util");

exports.createComplaint = async (req, res) => {
  try {
    let complaint = await Complaint.create(req.body);
    complaint.ticketId = generateTicketId();
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
  const { email, ticketId } = req.body;

  try {
    let complaint;
    if (ticketId) {
      complaint = await Complaint.findOne({ ticketId });
    } else if (email) {
      complaint = await Complaint.findOne({ email });
    }

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({
      ticketId: complaint.ticketId,
      status: complaint.status,
      category: complaint.category,
      description: complaint.description,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
