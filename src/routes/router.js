const express = require("express");
const patientRouter = require("./patientRouter");
const physicianRouter = require("./physicianRouter");
const appointmentRouter = require("./appointmentRouter");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("It's working");
});

router.use("/patient", patientRouter);
router.use("/physician", physicianRouter);
router.use("/appointment", appointmentRouter);

module.exports = router;
