const Sequelize = require("sequelize");

class Appointment extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        appointmentDate: Sequelize.DATE,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Patient, {
      foreignKey: "patientId",
      targetKey: "id",
    });
    this.belongsTo(models.Physician, {
      foreignKey: "physicianId",
      targetKey: "id",
    });
  }
}

module.exports = Appointment;
