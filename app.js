const express = require("express");
const mongoose = require("mongoose");

// Import the routes
const patientRoutes = require("./routes/patients-routes");
const appointmentRoutes = require("./routes/appointments-routes");
const emrRoutes = require("./routes/emr-routes");
const healthcareProviderRoutes = require("./routes/healthcareProviders-routes");
const staffRoutes = require("./routes/staff-routes");

const app = express();

app.use(express.json());

// Use the routes
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/emr", emrRoutes);
app.use("/healthcareProviders", healthcareProviderRoutes);
app.use("/staff", staffRoutes);

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.cldbwzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
