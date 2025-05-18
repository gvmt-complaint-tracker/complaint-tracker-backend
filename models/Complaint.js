const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  description: String,
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  response: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
