const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const complaintRoutes = require("./routes/complaint.routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/complaints", complaintRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
