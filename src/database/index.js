const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Patient = require("../models/Patient");
const Physician = require("../models/Physician");
const Appointment = require("../models/Appointment");

const connection = new Sequelize(dbConfig);

Patient.init(connection);
Physician.init(connection);
Appointment.init(connection);

Patient.associate(connection.models);
Physician.associate(connection.models);
Appointment.associate(connection.models);

module.exports = connection;
