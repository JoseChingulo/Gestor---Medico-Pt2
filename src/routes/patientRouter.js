const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

patientRouter.post(
  "/searchPatientByName",
  patientController.searchPatientByName
);

patientRouter.post("/newPatient", patientController.newPatient);

patientRouter.put("/updatePatient/", patientController.updatePatient);

patientRouter.post(
  "/searchPatientByPhysicianId/:physicianId",
  patientController.searchPatientByPhysicianId
);

module.exports = patientRouter;
