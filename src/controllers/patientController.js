const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Sequelize = require("sequelize");

module.exports = {
  async newPatient(req, res) {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({
        msg: "Os campos obrigatórios não foram preenchidos.",
      });
    }

    const isPatientNew = await Patient.findOne({
      where: { email },
    });
    if (isPatientNew)
      res.status(403).json({ msg: "Paciente já foi cadastrado." });
    else {
      const patient = await Patient.create({
        name,
        email,
        phone,
      }).catch((error) => {
        res.status(500).json({ msg: "Não foi possível inserir os dados." });
      });
      if (patient)
        res.status(201).json({ msg: "Novo paciente foi cadastrado com sucesso" });
      else
        res
          .status(404)
          .json({ msg: "Não foi possível cadastrar novo paciente" });
    }
  },
  async searchPatientByName(req, res) {
    const name = req.body.name;
    if (!name)
      res.status(400).json({
        msg: "O pârametro nome esta vazio.",
      });
    const Op = Sequelize.Op;
    const patient = await Patient.findAll({
      where: { name: { [Op.like]: "%" + name + "%" } },
    }).catch((error) => {
      res.status(500).json({ msg: "Falha na conexão. " });
    });

    if (patient) {
      if (patient === "")
        res.status(404).json({ msg: "Paciente não encontrado" });
      else res.status(200).json({ patient });
    } else
      res.status(404).json({
        msg: "Paciente não encontrado",
      });
  },
  async searchPatientByPhysicianId(req, res) {
    const physicianId = req.params.physicianId;
    if (!physicianId)
      res.status(400).json({
        msg: "Campo medico vazio",
      });

    const patients = await Appointment.findAll({
      attributes: ["patientId"],
      where: { physicianId },
      raw: true,
      include: [
        {
          model: Patient,
          required: true,
          attributes: ["name", "phone", "email"],
        },
      ],
    }).catch((error) => res.status(500).json({ msg: "Falha na conexão" }));

    const obj = patients;
    console.log(obj);
    if (patients) {
      if (patients == "")
        res.status(404).json({ msg: "Não há pacientes para este medico." });
      else {
        res.status(200).json({ patients });
      }
    } else
      res.status(404).json({ msg: "Não foi possível encontrar pacientes" });
  },
  async updatePatient(req, res) {
    const patientId = req.body.id;
    const patient = req.body;
    if (!patientId) res.status(404).json({ msg: "O ID do paciente esta vazio. " });
    else {
      const patientExists = await Patient.findByPk(patientId);
      if (!patientExists)
        res.status(404).json({ msg: "Paciente consultado não encontrado. " });
      else {
        if (patient.name || patient.email || patient.phone) {
          await Patient.update(patient, {
            where: { id: patientId },
          });
          return res
            .status(200)
            .json({ msg: "Paciente atualizado com sucesso" });
        } else
          return res
            .status(400)
            .json({ msg: "Campos obrigatórios nao preenchidos. " });
      }
    }
  },
};
