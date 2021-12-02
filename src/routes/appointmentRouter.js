const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.post("/newAppointment", appointmentController.newAppointment);

appointmentRouter.delete(
  "/deleteAppointment/:id",
  appointmentController.deleteAppointment
);

appointmentRouter.post(
  "/searchAppointmentByPatientId/:patientId",
  appointmentController.searchAppointmentByPatientId
);

appointmentRouter.post(
  "/searchAppointmentByPhysicianId/:physicianId",
  appointmentController.searchAppointmentByPhysicianId
);
module.exports = appointmentRouter;
