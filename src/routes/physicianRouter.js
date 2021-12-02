const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");

physicianRouter.get("/listAllPhysician", physicianController.listAllPhysician);
physicianRouter.post("/newPhysician", physicianController.newPhysician);
physicianRouter.delete(
  "/deletePhysician/:id",
  physicianController.deletePhysician
);
physicianRouter.put("/updatePhysician/", physicianController.updatePhysician);
module.exports = physicianRouter;
